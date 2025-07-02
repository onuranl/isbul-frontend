'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StatusFilter, GenderFilter } from '@/types/api';
import { X } from 'lucide-react';

interface CharacterFiltersProps {
  status: StatusFilter;
  gender: GenderFilter;
  onStatusChange: (value: StatusFilter) => void;
  onGenderChange: (value: GenderFilter) => void;
  onClearFilters: () => void;
}

export function CharacterFilters({
  status,
  gender,
  onStatusChange,
  onGenderChange,
  onClearFilters,
}: CharacterFiltersProps) {
  const hasActiveFilters = status !== '' || gender !== '';

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="status-filter" className="text-sm font-medium">
          Status
        </label>
        <Select
          value={status || undefined}
          onValueChange={(value) => onStatusChange(value as StatusFilter)}
        >
          <SelectTrigger className="w-full sm:w-[180px]" id="status-filter">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alive">Alive</SelectItem>
            <SelectItem value="dead">Dead</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="gender-filter" className="text-sm font-medium">
          Gender
        </label>
        <Select
          value={gender || undefined}
          onValueChange={(value) => onGenderChange(value as GenderFilter)}
        >
          <SelectTrigger className="w-full sm:w-[180px]" id="gender-filter">
            <SelectValue placeholder="All Genders" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="genderless">Genderless</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <div className="flex items-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="h-10"
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
