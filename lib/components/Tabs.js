import { h, toChildArray, createRef } from 'preact';
import { useState, useMemo } from 'preact/hooks';
import { useUpdateEffect, useId } from '../utils/hooks';
import TabPanel from './TabPanel';
import Tab from './Tab';

const KEY_LEFT = 37;
const KEY_RIGHT = 39;

const Tabs = ({ children }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedTab = createRef();
    const uid = useId();

    useUpdateEffect(() => {
        if (selectedTab.current != null) {
            selectedTab.current.focus();
        }
    }, [selectedIndex]);

    const tabs = useMemo(() => (
        toChildArray(children).map(({ props }, index) => ({
            index,
            label: props.label,
            id: props.id || `tab-${uid}-${index + 1}`,
            class: props.class,
            content: props.children,
        }))
    ), [children]);

    const setSelectedTab = (index) => (el) => {
        if (index === selectedIndex) {
            selectedTab.current = el;
        }
    };

    const onTabClick = (index) => (e) => {
        e.preventDefault();
        setSelectedIndex(index);
    };

    const onKeyDown = (e) => {
        if (e.keyCode === KEY_LEFT || e.keyCode === KEY_RIGHT) {
            e.preventDefault();

            const numTabs = tabs.length - 1;
            let tabIndex = selectedIndex + (e.keyCode === KEY_RIGHT ? 1 : -1);

            if (tabIndex < 0) tabIndex = numTabs;
            if (tabIndex > numTabs) tabIndex = 0;

            setSelectedIndex(tabIndex);
        }
    };

    return (
        <div class="tabs">
            <ul class="tab-list" role="tablist" onKeyDown={onKeyDown}>
                {tabs.map(({ index, ...props }) => (
                    <Tab
                        {...props}
                        selected={selectedIndex === index}
                        onClick={onTabClick(index)}
                        buttonRef={setSelectedTab(index)}
                    />
                ))}
            </ul>
            {tabs.map(({ content, ...props }, index) => (
                <TabPanel {...props} selected={selectedIndex === index}>
                    {content}
                </TabPanel>
            ))}
        </div>
    );
};

export default Tabs;
