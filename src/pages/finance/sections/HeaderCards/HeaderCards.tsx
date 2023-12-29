import React, { useEffect, useState } from "react";
import TFHeaderCard from "../../../../components/ui/TFHeaderCard/TFHeaderCard";
import ICONS from "../../../../constants/Icons";
import SERVICES from "../../../../services/Services";

type Props = {
  variant: "AP" | "AR";
};

const CARDS_AR = [
  {
    label: "Revenue",
    icon: ICONS.FINANCE_PRIMARY,
    value: "$ 25034",
    percentage: 0,
    bgColor: "#F7F5FF",
  },
  {
    label: "Recieved Payments",
    icon: ICONS.DONE_GREEN,
    value: "$ 25034",
    percentage: 0,
    bgColor: "#EAF7EE",
  },
  {
    label: "Pending Payments",
    icon: ICONS.CLOCK_YELLOW,
    value: "$ 25034",
    percentage: 0,
    bgColor: "#C6720E",
  },
  {
    label: "Overdue Payments",
    icon: ICONS.WARNING_RED,
    value: "$ 25034",
    percentage: 0,
    bgColor: "#FFF5F5",
  },
];

const CARDS_AP = [
  {
    label: "Paid",
    icon: ICONS.DONE_GREEN,
    value: "$ 25034",
    percentage: 0,
    bgColor: "#EAF7EE",
  },
  {
    label: "Pending Payments",
    icon: ICONS.CLOCK_YELLOW,
    value: "$ 25034",
    percentage: 0,
    bgColor: "#C6720E",
  },
  {
    label: "Overdue Payments",
    icon: ICONS.WARNING_RED,
    value: "$ 25034",
    percentage: 0,
    bgColor: "#FFF5F5",
  },
];

const HeaderCards = ({ variant }: Props) => {
  const cards = variant === "AR" ? CARDS_AR : CARDS_AP;
  const [values, setValues] = useState<(number | null)[]>([0, 0, 0, 0]);

  useEffect(() => {
    const fetch = async () => {
        try {
            const res = await SERVICES.getFinanceCount();
            setValues([res.res.total, res.res.recieved, res.res.pending, res.res.overdue])
        } catch (error) {
            console.log(error);
        }
    }

    fetch();
  }, [])
  
  return (
    <div
      className="d-flex flex-row gap-20"
      style={{ margin: "0px 32px 32px 32px" }}
    >
      {cards.map((card, idx) => (
        <TFHeaderCard
          variant="PERCENTAGE"
          label={card.label}
          icon={card.icon}
          value={values[idx]}
          percentage={card.percentage}
          iconBgColor={card.bgColor}
        />
      ))}
    </div>
  );
};

export default HeaderCards;
