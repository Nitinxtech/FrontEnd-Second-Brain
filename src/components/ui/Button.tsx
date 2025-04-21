import { ReactElement } from "react";

type Variants =  "primary" | "secondary";
interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg";
    text: string,
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void; 
    fullWidth?: boolean;
    loading?: boolean;
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}

const sizeStyles = {
    "sm": "py-1 px-2 rounded-sm",
    "md": "py-1 px-3 rounded-md",
    "lg": "py-4 px-6 rounded-xl"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center"

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} disabled={props.loading} className={`${variantStyles[props.variant]} ${props.fullWidth ? "w-full flex justify-center items-center" : ""} ${defaultStyles} ${props.loading? "opacity-45" : ""} ${sizeStyles[props.size]}`}> 
    <div className="pr-1"> 
        {props.startIcon} 
    </div>
    {props.text}
    {props.endIcon}
    </button>
}