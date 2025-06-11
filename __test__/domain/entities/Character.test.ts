import { Character } from '@entities/Character';

describe('Character Entity', () => {
  it('should create a character with correct properties', () => {
    const character: Character = {
        id: '1',
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: 'Human',
        gender: 'Male',
        origin: {
            id: '1',
            name: 'Earth',
            type: 'Planet',
            dimension: 'Dimension C-137'
        },
        location: {
            id: '1',
            name: 'Earth',
            type: 'Planet',
            dimension: 'Dimension C-137'
        },
        image: '',
        episode: [],
        created: ''
    };
    expect(character.name).toBe('Rick Sanchez');
    expect(character.status).toBe('Alive');
    expect(character.species).toBe('Human');
    expect(character.type).toBe('Human');
    expect(character.gender).toBe('Male');
  });
});