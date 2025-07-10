import { Component, type JSX } from 'react';
import styles from './Header.module.scss';
import Button from '@components/Button/Button.tsx';
import InputElement from '@components/Input/Input.tsx';
import { FaSearch } from 'react-icons/fa';
import BrokenComponent from '@components/BrokenComponent/BrokenComponent.tsx';
import { BUTTON_LABELS, PLACEHOLDERS } from '@/constants/constants.ts';

class Header extends Component {
  state: { showErrorComponent: boolean } = {
    showErrorComponent: false,
  };

  handleErrorClick = (): void => {
    this.setState({ showErrorComponent: true });
  };

  render(): JSX.Element {
    return (
      <header className={`container ${styles.header}`}>
        <InputElement placeholder={PLACEHOLDERS.SEARCH} />
        <Button>
          <FaSearch />
        </Button>
        <Button onClick={this.handleErrorClick}>{BUTTON_LABELS.ERROR}</Button>
        {this.state.showErrorComponent && <BrokenComponent />}
      </header>
    );
  }
}

export default Header;
