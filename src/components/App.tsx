import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import * as Article from './article';
import * as ArticleParamsForm from './article-params-form/ArticleParamsForm';
import * as articleProps from '../constants/articleProps';

import '../styles/index.scss';
import styles from '../styles/index.module.scss';



export const App = () => {
	const [articleState, setArticleState] = useState<articleProps.ArticleStateType>(articleProps.defaultArticleState);

	const updateStyle = (state: articleProps.ArticleStateType) => {
		setArticleState(state)
	}

	const resetStyle = () => {
		setArticleState(articleProps.defaultArticleState)
	}

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm.ArticleParamsForm ArticleStateType={articleProps.defaultArticleState} updateStyle={updateStyle} resetStyle={resetStyle} />
			<Article.Article />
		</div>
	);
};