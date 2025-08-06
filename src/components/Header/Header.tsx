import { Component, type JSX } from 'react';
import * as React from 'react';
import styles from './Header.module.scss';
import Button from '@components/Button/Button.tsx';
import InputElement from '@components/Input/Input.tsx';
import { FaSearch } from 'react-icons/fa';
import BrokenComponent from '@components/BrokenComponent/BrokenComponent.tsx';
import {
  BUTTON_LABELS,
  PLACEHOLDERS,
  LOCALSTORAGE_KEYS,
} from '@/constants/constants.ts';
import { searchStore } from '@/core/store/searchStore.ts';

class Header extends Component {
  state: { showErrorComponent: boolean; inputValue: string } = {
    showErrorComponent: false,
    inputValue: '',
  };

  componentDidMount(): void {
    const savedValue: string | null = localStorage.getItem(
      LOCALSTORAGE_KEYS.SEARCH_QUERY
    );

    if (savedValue) {
      this.setState({ inputValue: savedValue });
      searchStore.setQuery(savedValue);
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const trimmedValue: string = event.target.value.trim();
    this.setState({ inputValue: trimmedValue });
  };

  handleSearchClick = (): void => {
    searchStore.setQuery(this.state.inputValue);
    localStorage.setItem(LOCALSTORAGE_KEYS.SEARCH_QUERY, this.state.inputValue);
  };

  handleErrorClick = (): void => {
    this.setState({ showErrorComponent: true });
  };

  render(): JSX.Element {
    return (
      <header className={`container ${styles.header}`}>
        <InputElement
          placeholder={PLACEHOLDERS.SEARCH}
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <Button onClick={this.handleSearchClick}>
          <FaSearch />
        </Button>
        <Button onClick={this.handleErrorClick}>{BUTTON_LABELS.ERROR}</Button>
        {this.state.showErrorComponent && <BrokenComponent />}
      </header>
    );
  }
}

export default Header;
