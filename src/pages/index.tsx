import { Button } from '@mui/material';
import Example from './example.mdx';

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Tailwind + MUI</h1>
      <Button variant="contained">MUI 버튼</Button>
      <Example />
    </main>
  );
}
