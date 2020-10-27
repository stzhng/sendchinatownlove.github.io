import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  tabletScreens,
  phoneScreens,
} from '../../utilities/general/responsive';

interface Props {
  imageUrl: string;
  ctaText: string;
  titleText: string;
  descriptionItems: string[];
  buttonText: string;
  currentDonationCount: number;
  maxDonationCount: number;
}

const DonationTierItem = (props: Props) => {
  const { t } = useTranslation();
  const remainingDonationCount =
    props.maxDonationCount - props.currentDonationCount;

  return (
    <React.Fragment>
      <Container>
        <ColumnContainer>
          <ImageContainer>
            <Image src={props.imageUrl} alt="donation_tier_image" />
          </ImageContainer>
        </ColumnContainer>
        <ColumnContainer>
          <CTA>{props.ctaText}</CTA>
          <Title>{props.titleText}</Title>
          {props.descriptionItems.map((descriptionItem: any) => (
            <Description>{descriptionItem}</Description>
          ))}
          {/* Spacer to keep text aligned between donations items */}
          <div style={{ width: '600px' }}></div>
        </ColumnContainer>
        <ColumnContainer>
          <Button className={'button--filled'} onClick={() => {}}>
            {props.buttonText}
          </Button>
          <DonationText>
            {' '}
            <b>
              {t('lightUpChinatown.donationAmount', {
                donationCount: props.currentDonationCount,
              })}
            </b>
          </DonationText>
          {props.maxDonationCount !== 0 && (
            <DonationText>
              {' '}
              {t('lightUpChinatown.donationProgress', {
                remainingAmount: remainingDonationCount,
                availableAmount: props.maxDonationCount,
              })}{' '}
            </DonationText>
          )}
        </ColumnContainer>
      </Container>
    </React.Fragment>
  );
};

export default DonationTierItem;

const Container = styled.div`
  margin: 15px 0px;
  display: flex;
  height: 252px;
  justify-content: space-between;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  -moz-box-shadow: 0 0 7px #ccc;
  -webkit-box-shadow: 0 0 7px #ccc;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);

  @media (${tabletScreens}) {
    height: 580px;
    flex-direction: column;
    position: relative;
    padding: 20px;
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;

  @media (${tabletScreens}) {
    padding: 0.5rem 1rem;

    > button {
      width: 100%;
    }

    > img {
      height: 100px;
      object-fit: cover;
      object-position: 0 25%;
    }
  }
`;

const CTA = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.02em;
  color: #1e7c9a;
  margin-bottom: 27px;

  @media (${phoneScreens}) {
    font-size: 15px;
    margin-bottom: 15px;
  }
`;

const Title = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: 0.02em;
  color: #000000;
  margin-bottom: 27px;

  @media (${phoneScreens}) {
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

const Description = styled.li`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: #1e1e1e;
  @media (${phoneScreens}) {
    font-size: 13px;
  }
`;

const Button = styled.div`
  text-align: center;
  width: 248px;
  letter-spacing: 0.15em;
  cursor: pointer;
  margin: 50px 0px 20px 0px;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.05em;

  @media (${phoneScreens}) {
    font-size: 14px;
    width: 100%;
    margin: 16px 0px 16px 0px;
  }
`;

const DonationText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #cf6e8a;
`;

const ImageContainer = styled.div`
  margin: 40px 0px 0px 40px;
  height: 115px;
  width: 200px;

  @media (${phoneScreens}) {
    width: 100%;
    margin: 0px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;
