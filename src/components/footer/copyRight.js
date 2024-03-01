import React from 'react';
import UseGeneral from '../../hooks/useGeneral';

const CopyRight = () => {
  const { language } = UseGeneral();
  return (
    <p className="bottomFooter">
      {language == "ar"
        ? "كل الحقوق محفوظة سوبر ماركت جرين تريز 2024 © تصميم بواسطة Value IMS"
        : "All rights reserved Green Trees Supermarket 2024 © Designed by Value IMS"}
    </p>
  );
};

export default CopyRight;
