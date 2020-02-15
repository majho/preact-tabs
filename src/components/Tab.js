import { h } from 'preact';
import classNames from 'classnames';

const Tab = ({ label, selected, id, onClick, buttonRef }) => (
    <li role="presentation">
        <button 
            id={id}
            class={classNames('tab', { 'is-selected': selected })}
            role="tab"
            tabindex={selected ? 0 : -1}
            aria-selected={selected.toString()}
            ariacontrols={`${id}-panel`}
            onClick={onClick}
            ref={buttonRef}
        >
            {label}
        </button>
    </li>
);

export default Tab;
