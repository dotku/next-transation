export default function TransationSOP() {
  return (
    <div className="text-small text-left">
      <div className="mb-3">
        <h5 className="text-xl">SOP</h5>
        <ol className="list-decimal px-6">
          <li>Sender request trnsation</li>
          <li>Bank process the transation</li>
          <li>Bank update transation status once it is done</li>
          <li>
            Sender receive notification on the update (might need update
            document if anything failed)
          </li>
        </ol>
      </div>
    </div>
  );
}
