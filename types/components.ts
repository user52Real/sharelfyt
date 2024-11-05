import { BaseProps } from "./common";

export interface CardProps extends BaseProps {
    title: string;
    description?: string;
    image?: {
      src: string;
      alt: string;
    };
    onClick?: () => void;
}