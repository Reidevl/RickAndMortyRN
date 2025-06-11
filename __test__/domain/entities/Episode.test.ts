import { Episode } from '@entities/Episode';

describe('Episode Entity', () => {  
  it('should create an episode with correct properties', () => {
    const episode: Episode = {
      id: '1',
      name: 'Pilot',
      air_date: '2020-01-01',
      episode: 'S01E01',
      characters: [],
      created: '2020-01-01T00:00:00Z',
    };
    expect(episode.name).toBe('Pilot');
    expect(episode.episode).toBe('S01E01');
  });
});
