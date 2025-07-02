'use client';

import { useQueryState } from 'nuqs';
import { useCharacters } from '@/hooks/useCharacters';
import { CharacterCard } from '@/components/CharacterCard';
import { CharacterFilters } from '@/components/CharacterFilters';
import { CharacterGridSkeleton } from '@/components/CharacterGridSkeleton';
import { Pagination } from '@/components/Pagination';
import { StatusFilter, GenderFilter } from '@/types/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Users } from 'lucide-react';

export default function HomePage() {
  const [status, setStatus] = useQueryState('status', {
    shallow: false,
  });

  const [gender, setGender] = useQueryState('gender', {
    shallow: false,
  });

  const [page, setPage] = useQueryState('page', {
    defaultValue: 1,
    parse: parseInt,
    serialize: String,
    shallow: false,
  });

  const { data, isLoading, error } = useCharacters({
    status: status || undefined,
    gender: gender || undefined,
    page,
  });

  const handleStatusChange = (value: StatusFilter) => {
    setStatus(value || null);
    setPage(1); // Reset to first page when filter changes
  };

  const handleGenderChange = (value: GenderFilter) => {
    setGender(value || null);
    setPage(1); // Reset to first page when filter changes
  };

  const handleClearFilters = () => {
    setStatus(null);
    setGender(null);
    setPage(1);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load characters. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Rick and Morty Characters
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore characters from the Rick and Morty universe
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <CharacterFilters
            status={(status as StatusFilter) || ''}
            gender={(gender as GenderFilter) || ''}
            onStatusChange={handleStatusChange}
            onGenderChange={handleGenderChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Results Info */}
        {data && (
          <div className="text-muted-foreground mb-6 flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>
              Showing {data.results.length} of {data.info.count} characters
            </span>
          </div>
        )}

        {/* Characters Grid */}
        {isLoading ? (
          <CharacterGridSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data?.results.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            {/* Pagination */}
            {data && data.info.pages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={page}
                  totalPages={data.info.pages}
                  onPageChange={(newPage) => setPage(newPage)}
                  hasNextPage={!!data.info.next}
                  hasPrevPage={!!data.info.prev}
                />
              </div>
            )}

            {/* No Results */}
            {data?.results.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">
                  No characters found with the current filters.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
