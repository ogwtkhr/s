import React, { useMemo } from 'react';
import { Link } from 'gatsby';
import { ValueOf } from '@/types';
import styled, { css } from 'styled-components';
import {
  StyleMixin,
  AspectRatio,
  TextSize,
  TypographyMixin,
  LineHeight,
  Colors,
  Spacing,
  ScreenType,
  DateFormat,
  SizeType,
  LetterSpacing,
} from '@/constants';
import { MicroCMSImage } from '@/atoms';
import dayjs from 'dayjs';
import media from 'styled-media-query';

export const ArchiveArticleItemDirection = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
} as const;

export type ArchiveArticleItemDirection = ValueOf<typeof ArchiveArticleItemDirection>;

export type ArchiveArticleItemProps = {
  slug: string;
  title: string;
  mainVisualUrl: string;
  publishDate: string;
  direction?: ArchiveArticleItemDirection;
  textSize?: Extract<SizeType, 'small' | 'normal'>;
  enableTextSizingOnSmallScreen?: boolean;
};

export const ArchiveArticleItem: React.FC<ArchiveArticleItemProps> = ({
  slug,
  title,
  mainVisualUrl,
  publishDate,
  direction = ArchiveArticleItemDirection.VERTICAL,
  textSize,
  enableTextSizingOnSmallScreen,
}) => {
  const formattedPublishDate = useMemo(
    () => dayjs(publishDate).format(DateFormat.YEAR_MONTH_DATE_JP),
    [publishDate],
  );

  // TODO: テーマ機能

  return (
    <ArchiveArticleItemContainer>
      <ArticleLink direction={direction} to={`/archive/${slug}`}>
        <ArticleThumbnailContainer direction={direction}>
          {/* TODO、細かいサイズ出し分け、ジャギ解消 */}
          <MicroCMSImage
            src={mainVisualUrl}
            options={{
              height: 500,
              aspectRatio: AspectRatio.R_4_BY_3,
            }}
            optionsSmallScreen={{
              height: 250,
            }}
          />
        </ArticleThumbnailContainer>
        <ArticleTitleContainer direction={direction}>
          <ArticleTitle
            textSize={textSize}
            enableTextSizingOnSmallScreen={enableTextSizingOnSmallScreen}
          >
            {title}
          </ArticleTitle>
          <PublishDate enableTextSizingOnSmallScreen={enableTextSizingOnSmallScreen}>
            {formattedPublishDate}
          </PublishDate>
        </ArticleTitleContainer>
      </ArticleLink>
    </ArchiveArticleItemContainer>
  );
};

type ArchiveArticleItemChildPropsWithDirection = Pick<ArchiveArticleItemProps, 'direction'>;
type ArchiveArticleItemChildPropsWithTextSize = Pick<
  ArchiveArticleItemProps,
  'textSize' | 'enableTextSizingOnSmallScreen'
>;

const ArticleLink = styled(Link)<ArchiveArticleItemChildPropsWithDirection>`
  display: ${({ direction }) =>
    direction === ArchiveArticleItemDirection.VERTICAL ? 'block' : 'flex'};
  text-decoration: none;
  ${StyleMixin.HOVER_EFFECT.NORMAL};
`;

const ArchiveArticleItemContainer = styled.article``;

const ArticleTitleContainer = styled.div<ArchiveArticleItemChildPropsWithDirection>`
  flex: 1;
  padding: ${Spacing.LARGE}px 0;
  ${({ direction }) =>
    direction === ArchiveArticleItemDirection.HORIZONTAL
      ? css`
          margin-left: ${Spacing.X_LARGE}px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          ${media.lessThan(ScreenType.MEDIUM)`
            margin-left: ${Spacing.LARGE}px;
            padding: 0;
          `}
        `
      : ''};
`;

const ArticleTitle = styled.h4<ArchiveArticleItemChildPropsWithTextSize>`
  ${TypographyMixin.DISPLAY};
  font-size: ${({ textSize }) =>
    textSize === SizeType.SMALL ? TextSize.NORMAL : TextSize.LARGE}rem;
  letter-spacing: ${LetterSpacing.SEMI_WIDE}em;
  line-height: ${LineHeight.NORMAL};
  text-decoration: none;
  word-break: break-all;

  ${media.lessThan<ArchiveArticleItemChildPropsWithTextSize>(ScreenType.MEDIUM)`
    font-size: ${({ textSize, enableTextSizingOnSmallScreen }) =>
      enableTextSizingOnSmallScreen && textSize === SizeType.SMALL
        ? TextSize.SMALL
        : TextSize.NORMAL}rem
  `}
`;

const ArticleThumbnailContainer = styled.div<ArchiveArticleItemChildPropsWithDirection>`
  width: ${({ direction }) => (direction === ArchiveArticleItemDirection.VERTICAL ? 100 : 40)}%;
`;

const PublishDate = styled.time<ArchiveArticleItemChildPropsWithTextSize>`
  display: block;
  ${TypographyMixin.DISPLAY};
  color: ${Colors.UI_TEXT_SUB};
  font-size: ${({ textSize }) =>
    textSize === SizeType.SMALL ? TextSize.X_SMALL : TextSize.SMALL}rem;
  line-height: ${LineHeight.NORMAL};

  ${media.lessThan<ArchiveArticleItemChildPropsWithTextSize>(ScreenType.MEDIUM)`
    font-size: ${({ textSize, enableTextSizingOnSmallScreen }) =>
      enableTextSizingOnSmallScreen && textSize === SizeType.SMALL
        ? TextSize.XX_SMALL
        : TextSize.X_SMALL}rem
  `}
`;
