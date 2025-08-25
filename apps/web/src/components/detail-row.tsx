export default function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className='col-span-2 grid grid-cols-subgrid border-t border-t-accent py-5'>
      <p className='text-muted-foreground text-sm'>{label}</p>
      <div className=''>{value}</div>
    </div>
  );
}
