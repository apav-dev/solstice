export function renderSelectedLocation(name?: string, addressLine1?: string, addressLine2?: string) {
  return (
    <div className="absolute bottom-2 left-0 right-0 mx-auto flex w-96 justify-center rounded-xl bg-white">
      <div className="flex space-x-2 p-2">
        <div
          className="h-20 w-full rounded-lg bg-cover shadow-gym"
          style={{
            backgroundImage: `url(https://a.mktgcdn.com/p/Yyz-pNtNAlYZKTSQpzQaPrHi_q7-xmZns9UMvK30Vh8/2370x1422.jpg)`,
          }}
        />
        <div className="">
          <span className="inline-flex font-heading text-sm text-black">{name}</span>
          <span className="inline-flex font-body text-sm text-black">{addressLine1}</span>
          <span className="inline-flex font-body text-sm text-black">{addressLine2}</span>
        </div>
      </div>
    </div>
  );
}
