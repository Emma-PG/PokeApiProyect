import { MouseEventHandler } from "react";

export interface ElementProps {
    name: string;
    url: string;
  
  }
  
export interface EntriesProps {
    language: {
      name: string;
    };
  
}

export interface Props{
  listP?:Array<ElementProps> | undefined
  handleClick?:MouseEventHandler<HTMLLIElement>
  handleSubmit?:React.MouseEventHandler<HTMLButtonElement>
  handleChange?:React.ChangeEventHandler<HTMLInputElement>
}

