import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./input.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: IconProp;
}

const Input = ({ icon, className = "", ...props }: InputProps) => {
  return icon ? (
    <div className={`input-container ${className}`}>
      <FontAwesomeIcon icon={icon} className="input-icon" color="grey" />
      <input
        className={`search-input search-input-icon ${className}`}
        {...props}
      />
    </div>
  ) : (
    <input className={`search-input ${className}`} {...props} />
  );
};

export default Input;
