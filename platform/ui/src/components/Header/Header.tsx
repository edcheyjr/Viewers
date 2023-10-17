import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { NavBar, Svg, Icon, IconButton, Dropdown } from '@ohif/ui/src';

type MenuOptionType = {
  title: string;
  icon: string;
  onClick: () => any;
};

type PropType = {
  children?: ReactNode;
  menuOptions: MenuOptionType[];
  isReturnEnabled: boolean;
  onClickReturnButton: () => void;
  WhiteLabeling: any;
  isSticky?: boolean;
  rightSideItems?: ReactNode;
  leftSideItems?: ReactNode;
};

function Header({
  children,
  menuOptions,
  isReturnEnabled,
  onClickReturnButton,
  isSticky,
  WhiteLabeling,
  rightSideItems,
  leftSideItems,
  ...props
}: PropType): ReactNode {
  const { t } = useTranslation('Header');

  // TODO: this should be passed in as a prop instead and the react-router-dom
  // dependency should be dropped
  const onClickReturn = () => {
    if (isReturnEnabled && onClickReturnButton) {
      onClickReturnButton();
    }
  };

  return (
    <NavBar
      className="justify-between border-b-4 border-black"
      isSticky={isSticky ?? false}
    >
      <div className="flex justify-between flex-1">
        {/* left side of the Header */}
        <div className="flex items-center">
          {/* // TODO: Should preserve filter/sort
              // Either injected service? Or context (like react router's `useLocation`?) */}
          <div
            className={classNames(
              'inline-flex items-center mr-3',
              isReturnEnabled && 'cursor-pointer'
            )}
            onClick={onClickReturn}
            data-cy="return-to-work-list"
          >
            {isReturnEnabled && (
              <Icon name="chevron-left" className="w-8 text-primary-active" />
            )}
            <div className="ml-4">
              {WhiteLabeling?.createLogoComponentFn?.(React, props) || (
                <Svg name="logo-ohif" />
              )}
            </div>
          </div>
          {leftSideItems}
        </div>

        {/* Center of the Header */}
        <div className="flex items-center">{children}</div>

        {/* Left Side of the header */}
        <div className="flex items-center">
          {rightSideItems}
          <span className="mr-3 text-lg text-common-light">
            {t('INVESTIGATIONAL USE ONLY')}
          </span>
          <Dropdown id="options" showDropdownIcon={false} list={menuOptions}>
            <IconButton
              id={'options-settings-icon'}
              variant="text"
              color="inherit"
              size="initial"
              className="text-primary-active"
            >
              <Icon name="settings" />
            </IconButton>
            <IconButton
              id={'options-chevron-down-icon'}
              variant="text"
              color="inherit"
              size="initial"
              className="text-primary-active"
            >
              <Icon name="chevron-down" />
            </IconButton>
          </Dropdown>
        </div>
      </div>
    </NavBar>
  );
}

// Header.propTypes = {
//   menuOptions: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       icon: PropTypes.string,
//       onClick: PropTypes.func.isRequired,
//     })
//   ),
//   children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
//   isReturnEnabled: PropTypes.bool,
//   isSticky: PropTypes.bool,
//   onClickReturnButton: PropTypes.func,
//   WhiteLabeling: PropTypes.object,
// };

// Header.defaultProps = {
//   isReturnEnabled: true,
//   isSticky: false,
// };

export default Header;
