import React from 'react'
import TFHeaderCard from '../../../../components/ui/TFHeaderCard/TFHeaderCard';
import ICONS from '../../../../constants/Icons';

type Props = {
    variant: "AP" | "AR";
}

const CARDS_AR = [
    {
        label: 'Revenue',
        icon: ICONS.FINANCE_PRIMARY,
        value: "$ 25034",
        percentage: 3.25,
        bgColor: '#F7F5FF'
    },
    {
        label: 'Recieved Payments',
        icon: ICONS.DONE_GREEN,
        value: "$ 25034",
        percentage: 3.25,
        bgColor: '#EAF7EE'
    },
    {
        label: 'Pending Payments',
        icon: ICONS.CLOCK_YELLOW,
        value: "$ 25034",
        percentage: 3.25,
        bgColor: '#C6720E'
    },
    {
        label: 'Overdue Payments',
        icon: ICONS.WARNING_RED,
        value: "$ 25034",
        percentage: 3.25,
        bgColor: '#FFF5F5'
    },
];

const CARDS_AP = [
    {
        label: 'Paid',
        icon: ICONS.DONE_GREEN,
        value: "$ 25034",
        percentage: 3.25,
        bgColor: '#EAF7EE'
    },
    {
        label: 'Pending Payments',
        icon: ICONS.CLOCK_YELLOW,
        value: "$ 25034",
        percentage: 3.25,
        bgColor: '#C6720E'
    },
    {
        label: 'Overdue Payments',
        icon: ICONS.WARNING_RED,
        value: "$ 25034",
        percentage: 3.25,
        bgColor: '#FFF5F5'
    },
];

const HeaderCards = ({variant} : Props) => {
    const cards = variant === "AR" ? CARDS_AR : CARDS_AP;
  return (
    <div className='d-flex flex-row gap-20' style={{margin: "0px 32px 32px 32px"}}>
        {
            cards.map((card) => (
                <TFHeaderCard
                    variant="PERCENTAGE"
                    label={card.label}
                    icon={card.icon}
                    value={card.value}
                    percentage={card.percentage}
                    iconBgColor={card.bgColor}
                />
            ))
        }
    </div>
  )
}

export default HeaderCards