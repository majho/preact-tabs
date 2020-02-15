import { h } from 'preact';
import classNames from 'classnames';

const TabPanel = ({ id, class: className, children, selected }) => (
    <div 
        id={`${id}-panel`}
        class={classNames('tab-panel', className)}
        role="tabpanel"
        tabindex="0"
        aria-labelledby={id}
        hidden={!selected}
    >
        {children}
    </div>
);

export default TabPanel;
