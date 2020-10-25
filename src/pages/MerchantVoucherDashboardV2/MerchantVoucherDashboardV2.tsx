import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import VoucherDashboard from './VoucherDashboard';
import ErrorPage from '../../components/404Page';
import Loader from '../../components/Loader/Loader';
import {
  getMerchantGiftCards,
  getSeller,
} from '../../utilities/api/interactionManager';
import type {
  BrowsePageSeller,
  GiftCardDetails,
} from '../../utilities/api/types';

const MerchantVoucherDashboardV2 = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [seller, setSeller] = useState<BrowsePageSeller | null>(null);
  const [giftCards, setGiftCards] = useState<GiftCardDetails[]>([]);

  const printRef = useRef(null);
  const [showPrintView, setShowPrintView] = useState<boolean>(false);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onAfterPrint: () => setShowPrintView(false),
  });
  const print = useCallback(() => {
    if (handlePrint) {
      setShowPrintView(true);
      handlePrint();
    }
  }, [handlePrint]);

  const params = useHistory();
  const urlParams = (params.location.pathname.match(
    /\/[^/]+/g
  ) as string[]).map((param) => param.replace('/', ''));
  const sellerId = urlParams[0];
  const secretId = urlParams[2];

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const sellerResponse = await getSeller(sellerId);
      const giftCardResponse = await getMerchantGiftCards(sellerId, secretId);

      setSeller(sellerResponse.data);
      setGiftCards(giftCardResponse.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [sellerId, secretId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Loader isPage={true} />;
  } else if (error || !seller) {
    return <ErrorPage menuOpen={false} />;
  }

  return (
    <div ref={printRef}>
      <VoucherDashboard
        fetchData={fetchData}
        giftCards={giftCards}
        handlePrint={print}
        organizationName={seller.name}
        showPrintView={showPrintView}
      />
    </div>
  );
};

export default MerchantVoucherDashboardV2;
