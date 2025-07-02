'use client';

import { Character } from '@/types/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, User } from 'lucide-react';
import { useCharacterStore } from '@/store/useCharacterStore';
import Image from 'next/image';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const { favorites, toggleFavorite } = useCharacterStore();
  const isFavorite = favorites.includes(character.id);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'default';
      case 'dead':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFavorite(character.id)}
            className="h-8 w-8 rounded-full bg-white/80 p-0 text-red-500 backdrop-blur-sm hover:bg-white/90 hover:text-red-600"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
        <div className="absolute bottom-2 left-2">
          <div className="flex items-center space-x-1">
            <div
              className={`h-2 w-2 rounded-full ${getStatusColor(character.status)}`}
            />
            <Badge
              variant={getStatusVariant(character.status)}
              className="text-xs"
            >
              {character.status}
            </Badge>
          </div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-lg font-bold">
          {character.name}
        </CardTitle>
        <div className="text-muted-foreground flex items-center space-x-2 text-sm">
          <User className="h-4 w-4" />
          <span>{character.gender}</span>
          <span>•</span>
          <span>{character.species}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-start space-x-2 text-sm">
            <MapPin className="text-muted-foreground mt-0.5 h-4 w-4" />
            <div>
              <p className="font-medium">Last known location:</p>
              <p className="text-muted-foreground">{character.location.name}</p>
            </div>
          </div>
          <div className="flex items-start space-x-2 text-sm">
            <MapPin className="text-muted-foreground mt-0.5 h-4 w-4" />
            <div>
              <p className="font-medium">Origin:</p>
              <p className="text-muted-foreground">{character.origin.name}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
