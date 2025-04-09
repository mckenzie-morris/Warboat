const Gameboard = ({}) => {
  const letters = Array.from("ABCDEFGHIJ")
  const numbers = Array.from({ length: 10 }, (cVal, i) => i + 1);

  return (
    <div className="mx-auto w-full p-4 ~/sm:min-w-max ~sm/3xl:~max-w-sm/3xl">
      {/* Top row: number labels */}
      <div className="grid grid-cols-11">
        <div className="aspect-square"></div> {/* empty corner */}
        {numbers.map((num) => (
          <div
            key={num}
            className="flex aspect-square items-center justify-center text-xs font-semibold sm:text-sm"
          >
            {num}
          </div>
        ))}
      </div>

      {/* Main grid rows */}
      {letters.map((letter) => (
        <div key={letter} className="grid grid-cols-11">
          {/* Row label (letter) */}
          <div className="flex aspect-square items-center justify-center text-xs font-semibold sm:text-sm">
            {letter}
          </div>

          {/* Grid cells */}
          {numbers.map((num) => (
            <div
              key={`${letter}${num}`}
              className="flex aspect-square items-center justify-center border border-gray-300 text-[10px] transition hover:bg-gray-200 sm:text-xs"
            >
              {letter + num}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Gameboard;
