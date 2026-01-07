import React, { useRef, useState } from 'react';
import { cn } from "@/lib/utils";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    perspective?: number;
}

const TiltCard = ({ children, className, perspective = 1000 }: TiltCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25; // Divide by 25 to control sensitivity
        const y = (e.clientY - top - height / 2) / 25;

        // Inverse rotation for "looking into" the card
        // RotateX is based on Y axis movement, RotateY is based on X axis movement
        setTransform(`rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.05, 1.05, 1.05)`);
    };

    const handleMouseLeave = () => {
        setTransform("rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn("transition-transform duration-200 ease-out transform-gpu", className)}
            style={{
                transformStyle: "preserve-3d",
                transform,
                perspective: `${perspective}px`
            }}
        >
            {children}
        </div>
    );
};

export default TiltCard;
