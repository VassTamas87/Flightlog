import React from "react";

const Ranks = () => {
  const ranksArray = [
    "-",
    "Captain/ pilot/ Commander",
    "Senior First Officer/ Co- Pilot",
    "Observer/ Engineer",
    "Cabin Service Director",
    "Purser",
    "Inflight Manager",
    "Check Hostess",
    "Inflight Supervisor",
    "Grade One crew",
    "Grade Two crew",
    "Air Hostess/ Steward",
    "Trainee",
  ];

  return ranksArray.map((ranks) => (
    <option key={ranks} value={ranks}>
      {ranks}
    </option>
  ));
};

export default Ranks;
