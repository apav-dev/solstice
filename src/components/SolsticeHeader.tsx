
export function SolsticeHeader(): JSX.Element {
  return (
    <div className="flex flex-row justify-between px-4 h-24 items-center">
      <div className="flex space-x-32">
        <div className="font-heading font-black text-lg">Solstice</div>
        {/* <div className="flex font-heading">
          <div>LOCATIONS</div>
          <div>CLASSES</div>
          <div>TRAINERS</div>
        </div> */}
      </div>
      <div className="flex space-x-8 items-center font-heading font-bold" >
        <div className="align-middle">LOG IN</div>
        <div className="border rounded-md">
          <div className="py-4 px-10">JOIN US</div>
        </div>
      </div>
    </div>
  )
}