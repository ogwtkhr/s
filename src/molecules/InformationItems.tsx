import React from 'react';
import { UnderLineText } from '@/atoms';
import styled, { css } from 'styled-components';

import {
  Colors,
  LineHeight,
  LetterSpacing,
  ModuleWidth,
  ScreenType,
  Spacing,
  TextSize,
  TypographyMixin,
  BigSpacing,
  Layer,
  getResponsiveOffsetMixin,
} from '@/constants';
import media from 'styled-media-query';

type TitleInjectable = { title?: string };

export const InformationRow = styled.div`
  display: flex;
  margin-top: ${BigSpacing.NORMAL}px;
  margin-bottom: ${BigSpacing.NORMAL}px;
  ${getResponsiveOffsetMixin({
    maxWidth: ModuleWidth.MIDDLE,
    margin: Spacing.XXX_LARGE,
    marginSmall: Spacing.X_LARGE,
  })};

  ${media.lessThan(ScreenType.MEDIUM)`
    display: block;
    margin-top: ${BigSpacing.X_SMALL}px;
    margin-bottom: ${Spacing.XXX_LARGE}px;
  `}
`;

export const InformationUnit: React.FC<TitleInjectable> = ({ title, children }) => (
  <InformationUnitContainer>
    {title && (
      <InformationHeading>
        <UnderLineText>{title}</UnderLineText>
      </InformationHeading>
    )}
    {children}
  </InformationUnitContainer>
);

const InformationUnitContainer = styled.section`
  flex: 1;

  ${media.lessThan(ScreenType.MEDIUM)`
    & + & {
       margin-top: ${BigSpacing.X_SMALL}px;
    }
  `}
`;

const InformationHeading = styled.h3`
  position: relative;
  z-index: ${Layer.FIXED};
`;

export const InformationGroupRow = styled.div`
  display: flex;
  ${media.lessThan(ScreenType.MEDIUM)`
    display: block;
  `}
`;

export const InformationGroup: React.FC<TitleInjectable> = ({ title, children }) => (
  <InformationGroupContainer>
    {title && <InformationContentHeading>{title}</InformationContentHeading>}
    {children}
  </InformationGroupContainer>
);

const InformationGroupContainer = styled.div`
  position: relative;
  z-index: ${Layer.FIXED};
  flex: 1;
  margin: ${Spacing.XX_LARGE}px 0;

  ${media.lessThan(ScreenType.MEDIUM)`
    margin: ${Spacing.X_LARGE}px 0 ${Spacing.XXX_LARGE}px ;
  `};
`;

const InformationDescriptionList = styled.dl`
  & + & {
    margin-left: ${Spacing.X_LARGE}px;
  }
`;

const InformationDescriptionTerm = styled.dt`
  ${TypographyMixin.DISPLAY};
  margin-bottom: ${Spacing.NORMAL}px;
  color: ${Colors.UI_TEXT_SUB};
  font-size: ${TextSize.XX_SMALL}rem;
  line-height: ${LineHeight.MONOLITHIC};
`;

const InformationDescriptionDetail = styled.dd`
  ${TypographyMixin.DISPLAY};
  font-size: ${TextSize.XX_LARGE}rem;
  line-height: ${LineHeight.MONOLITHIC};
`;

const InformationDescriptionSupple = styled.p`
  margin-top: ${Spacing.NORMAL}px;
  font-size: ${({ size }: { size?: TextSize }) => size || TextSize.SMALL}rem;
  letter-spacing: ${LetterSpacing.SEMI_WIDE}em;
`;

const InformationDescriptionDetailSupple = styled.small`
  font-size: ${TextSize.SMALL}rem;
`;

type InformationContentProps = {
  flex?: number;
  verticalAlign?: 'top' | 'center';
  collapseOnVerySmallScreen?: boolean;
};

export const InformationContent: React.FC<InformationContentProps & TitleInjectable> = ({
  title,
  flex,
  verticalAlign = 'top',
  children,
  collapseOnVerySmallScreen,
}) => (
  <InformationContentContainer
    collapseOnVerySmallScreen={collapseOnVerySmallScreen}
    flex={flex}
    verticalAlign={verticalAlign}
  >
    {title && <InformationContentHeading>{title}</InformationContentHeading>}
    {children}
  </InformationContentContainer>
);

const InformationContentContainer = styled.div<InformationContentProps>`
  display: flex;
  flex: ${({ flex }: { flex?: number }) => (flex ? flex : '')};
  align-items: ${({ verticalAlign }) => (verticalAlign === 'top' ? 'flex-start' : 'center')};

  ${media.lessThan<InformationContentProps>(ScreenType.MEDIUM)`

    & + & {
      margin-top: ${Spacing.NORMAL}px;
    };

  `};

  /* TODO: 共通化 */
  ${media.lessThan<InformationContentProps>('370px')`

    display: ${({ collapseOnVerySmallScreen }) => (collapseOnVerySmallScreen ? 'block' : 'flex')};

    ${InformationDescriptionList} + ${InformationDescriptionList} {

      ${({ collapseOnVerySmallScreen }) =>
        collapseOnVerySmallScreen
          ? css`
              margin-left: 0;
              margin-top: ${Spacing.X_LARGE}px;
            `
          : ''}

      }
    `};
`;

const InformationContentHeading = styled.h4`
  ${TypographyMixin.DISPLAY};
  width: 140px;
  font-size: ${TextSize.LARGE}rem;

  ${media.lessThan(ScreenType.MEDIUM)`
    font-size: ${TextSize.NORMAL}rem;
  `};
`;

type InformationContentRowProps = { fix?: boolean };

export const InformationContentRow = styled.div<InformationContentRowProps>`
  display: flex;
  align-items: center;
  max-width: ${({ fix = true }) => (fix ? '400px' : '')};

  & + & {
    margin-top: ${Spacing.XX_LARGE}px;
  }

  ${InformationContentHeading} + & {
    margin-top: ${Spacing.LARGE}px;
  }

  ${media.lessThan(ScreenType.MEDIUM)`
    display: block;
    & + & {
      margin-top: ${Spacing.X_LARGE}px;
    }

    ${InformationContentHeading} + & {
      margin-top: ${Spacing.NORMAL}px;
    }

  `}
`;

type InformationItemProps = {
  title: string;
  body?: string;
  price?: number;
  supple?: string;
};

export const InformationItem: React.FC<InformationItemProps> = ({ title, body, price, supple }) => (
  <InformationDescriptionList>
    <InformationDescriptionTerm>{title}</InformationDescriptionTerm>
    <InformationDescriptionDetail>
      {body}
      {price && (
        <div>
          {price.toLocaleString()}
          <InformationDescriptionDetailSupple>円</InformationDescriptionDetailSupple>
        </div>
      )}
      {supple && <InformationDescriptionSupple>{supple}</InformationDescriptionSupple>}
    </InformationDescriptionDetail>
  </InformationDescriptionList>
);

export const InformationContentDashLine = styled.hr`
  display: block;
  width: ${Spacing.X_LARGE}px;
  height: 1px;
  margin: 0 ${Spacing.LARGE}px;
  background-color: ${Colors.UI_LINE_NORMAL};
`;

export const InformationNormalText = styled.p`
  ${TypographyMixin.DISPLAY};
  font-size: ${TextSize.NORMAL}rem;
  letter-spacing: ${LetterSpacing.SEMI_WIDE}em;

  ${media.lessThan(ScreenType.MEDIUM)`
  font-size: ${TextSize.SMALL}rem;
  `}
`;
