import Board from "../components/Board";
export default function Home(): JSX.Element {
  return (
    <div className="p-3 h-screen w-screen flex flex-col bg-white-50 font-medium">
      <h1 className="text-3xl text-center p-1">Drag-n-Drop Dashboard</h1>
      <h2 className="text-lg text-center p-1">
        Build With : React.js - Next.js - TypeScript - TailwindCSS -
        React-Beautifull-DnD
      </h2>
      <Board />
    </div>
  );
}
