export const setResults = ({ opponent, won }: { opponent: string, won: boolean }) => {
  const results = localStorage.getItem('results');
  if (results) {
    localStorage.setItem('results', JSON.stringify([...JSON.parse(results), { opponent, won }]));
  } else {
    localStorage.setItem('results', JSON.stringify([{ opponent, won }]));
  }
}