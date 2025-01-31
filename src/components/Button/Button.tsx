interface Props {
  label: string;
  parentMethod: () => void
}

export const Button = ({label, parentMethod}:Props) => {
  return (
    <button className="bg-black text-white rounded-sm px-4 py-1 cursor-pointer" onClick={parentMethod}>
      {label}
    </button>
  )
}