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
	const [formState, setFormState] = useState<ArticleStateType>(props.ArticleStateType)
	const rootRef = useRef<HTMLDivElement | null>(null)

	const openedForm = () => {
		setOpen(!isOpen)
	}

	function handleChange(optionName: string) {
		return function (value: OptionType) {
			return setFormState({ ...formState, [optionName]: value });
		}
	}

	function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();
		props.updateStyle(formState);
	}

	function resetValue() {
		setFormState(props.ArticleStateType);
		props.resetStyle();
	}

	const closeForm = () => {
		setOpen(false)
	}

	useOutsideClickClose({
		isOpen: isOpen,
		onChange: closeForm,
		rootRef
	})

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={openedForm} isOpen={isOpen} />
			<aside className={clsx(styles.container, {[styles.container_open]: isOpen})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text weight={800} uppercase={true} size={31}>Задайте параметры</Text>
					<Select options={fontFamilyOptions} selected={formState.fontFamilyOption} title='Шрифт' onChange={handleChange('fontFamilyOption')}></Select>
					<RadioGroup name='font size' options={fontSizeOptions} selected={formState.fontSizeOption} title='Размер шрифта' onChange={handleChange('fontSizeOption')}></RadioGroup>
					<Select options={fontColors} selected={formState.fontColor} title='Цвет шрифта' onChange={handleChange('fontColor')}></Select>
					<hr />
					<Select options={backgroundColors} selected={formState.backgroundColor} title='Цвет фона' onChange={handleChange('backgroundColor')}></Select>
					<Select options={contentWidthArr} selected={formState.contentWidth} title='Ширина контента' onChange={handleChange('contentWidth')}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetValue} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};