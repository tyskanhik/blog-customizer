import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Text } from '../text';
import { Select } from '../select';
import { ArticleStateType, OptionType, backgroundColors, contentWidthArr, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';


interface ParamsForms {
	ArticleStateType: ArticleStateType;
	updateStyle: (state: ArticleStateType) => void;
	resetStyle: () => void
}


export const ArticleParamsForm = (props: ParamsForms) => {
	const [isOpen, setOpen] = useState(false)
	const [state, setState] = useState<ArticleStateType>(props.ArticleStateType)
	const rootRef = useRef<HTMLDivElement | null>(null)

	const openedForm = () => {
		setOpen(!isOpen)
	}

	const changeFontFamily = (value: OptionType) => {
		setState({ ...state, fontFamilyOption: value })
	}

	const changeFontSize = (value: OptionType) => {
		setState({ ...state, fontSizeOption: value })
	}

	const changeFontColors = (value: OptionType) => {
		setState({ ...state, fontColor: value })
	}

	const changeBackgroundColors = (value: OptionType) => {
		setState({ ...state, backgroundColor: value })
	}

	const changeContentWidth = (value: OptionType) => {
		setState({ ...state, contentWidth: value })
	}

	function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();
		props.updateStyle(state);
	}

	function resetValue() {
		setState(props.ArticleStateType);
		props.resetStyle();
	}

	useOutsideClickClose({
		isOpen: isOpen,
		onChange: openedForm,
		rootRef
	})

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={() => openedForm()} isOpen={isOpen} />
			<aside className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text weight={800} uppercase={true} size={31}>Задайте параметры</Text>
					<Select options={fontFamilyOptions} selected={state.fontFamilyOption} title='Шрифт' onChange={changeFontFamily}></Select>
					<RadioGroup name='font size' options={fontSizeOptions} selected={state.fontSizeOption} title='Размер шрифта' onChange={changeFontSize}></RadioGroup>
					<Select options={fontColors} selected={state.fontColor} title='Цвет шрифта' onChange={changeFontColors}></Select>
					<hr />
					<Select options={backgroundColors} selected={state.backgroundColor} title='Цвет фона' onChange={changeBackgroundColors}></Select>
					<Select options={contentWidthArr} selected={state.contentWidth} title='Ширина контента' onChange={changeContentWidth}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetValue} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
<aside ></aside>