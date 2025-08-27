import { Spinner } from './ui/shadcn-io/spinner';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // full viewport height
        width: '100vw',
      }}
    >
      <Spinner variant='circle' size={300} />
    </div>
  );
}
