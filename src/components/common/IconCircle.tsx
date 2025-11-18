import type { LucideIcon } from "lucide-react";

interface IconCircleProps {
    icon: LucideIcon,
    bgColor: string,
    circleSize: number,
    iconSize: number
    iconColor: string
}

const IconCircle = ({ icon: Icon, bgColor="primary", circleSize=16, iconSize=8, iconColor="text-text-light" }: IconCircleProps) => {
    return (
        <div className={`w-${circleSize} h-${circleSize} bg-${bgColor} rounded-full flex items-center justify-center`}>
            <Icon className={`h-${iconSize} w-${iconSize} ${iconColor}`} aria-hidden="true" />
        </div>
    );
};

export default IconCircle;