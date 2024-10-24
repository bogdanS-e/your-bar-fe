import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';
import { Column } from 'styles/components';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: number;
  className?: string;
  onChange: (index: number) => void;
}

const transitionTimeout = 300;

const Tabs = ({ tabs, activeTab, className, onChange }: TabsProps) => {
  const tabsRef = useRef<HTMLDivElement>(null);

  const [tabDimensions, setTabDimensions] = useState({
    width: 0,
    left: 0,
  });
  const [prevTab, setPrevTab] = useState(activeTab);

  useEffect(() => {
    const currentTab = tabsRef.current?.children[activeTab] as HTMLButtonElement;

    if (!currentTab) {
      return;
    }

    setTabDimensions({
      width: currentTab.offsetWidth,
      left: currentTab.offsetLeft,
    });
  }, [activeTab]);

  const handleTabChange = (index: number) => {
    setPrevTab(activeTab);
    onChange(index);
  };

  return (
    <Column $alignItems="stretch" className={className}>
      <TabList ref={tabsRef}>
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            $isActive={index === activeTab}
            onClick={() => handleTabChange(index)}
          >
            {tab.label}
          </TabButton>
        ))}
        <ActiveTabIndicator $tabWidth={tabDimensions.width} $leftPosition={tabDimensions.left} />
      </TabList>
      <TabContentWrapper>
        <TransitionGroup
          component={null}
          childFactory={(child) =>
            React.cloneElement(child, {
              classNames: prevTab < activeTab ? 'right-to-left' : 'left-to-right',
              timeout: 1000,
            })
          }
        >
          <CSSTransition key={activeTab} classNames="right-to-left" timeout={1000}>
            <TabContent>{tabs[activeTab].content}</TabContent>
          </CSSTransition>
        </TransitionGroup>
      </TabContentWrapper>
    </Column>
  );
};

export default Tabs;

const TabList = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid #ccc;
`;

const TabButton = styled.button<{ $isActive: boolean }>`
  padding: 12px 16px;
  font-size: 1rem;
  color: ${({ $isActive }) => ($isActive ? '#3f51b5' : '#757575')};
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  transition: color ${transitionTimeout}ms;

  &:hover {
    color: #3f51b5;
  }
`;

const ActiveTabIndicator = styled.div<{
  $tabWidth: number;
  $leftPosition: number;
}>`
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: #3f51b5;
  width: ${({ $tabWidth }) => $tabWidth}px;
  transform: translateX(${({ $leftPosition }) => $leftPosition}px);
  transition:
    transform ${transitionTimeout}ms ease,
    width ${transitionTimeout}ms ease;
`;

const TabContentWrapper = styled.div`
  width: 100%;
  display: grid;
  overflow: hidden;
  padding-top: 20px;
`;

const TabContent = styled.div`
  padding: 0 16px;
  grid-area: 1 / 1 / 2 / 2;
  width: 100%;

  &.right-to-left-enter {
    transform: translateX(100%);
  }
  &.right-to-left-enter-active {
    transform: translateX(0);
    transition: all ${transitionTimeout}ms ease;
  }
  &.right-to-left-exit {
    transform: translateX(0);
  }
  &.right-to-left-exit-active {
    transform: translateX(-100%);
    transition: all ${transitionTimeout}ms ease;
  }

  &.left-to-right-enter {
    transform: translateX(-100%);
  }
  &.left-to-right-enter-active {
    transform: translateX(0);
    transition: all ${transitionTimeout}ms ease;
  }
  &.left-to-right-exit {
    transform: translateX(0);
  }
  &.left-to-right-exit-active {
    transform: translateX(100%);
    transition: all ${transitionTimeout}ms ease;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 0;
  }
`;
