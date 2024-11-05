import { ReactNode } from "react";

export interface BaseProps {
    className?: string;
    children?: React.ReactNode;
}
  
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
  
export interface SortingProps<T> {
    field: keyof T;
    direction: 'asc' | 'desc';
    onSort: (field: keyof T) => void;
}
  
export interface ButtonProps extends BaseProps {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}
  
export interface CardProps extends BaseProps {
    title: string;
    description?: string;
    image?: {
      src: string;
      alt: string;
    };
    footer?: ReactNode;
    onClick?: () => void;
}

export interface InputProps extends BaseProps {
    label: string;
    name: string;
    type?: string;
    error?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
}