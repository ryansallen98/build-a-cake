import PropTypes from "prop-types";
import { SizeProvider } from "./SizeProvider";
import { CandleProvider } from "./CandleProvider";
import { FillingProvider } from "./FillingProvider";
import { SparklerProvider } from "./SparklerProvider";
import { IcingProvider } from "./IcingProvider";
import { InscriptionProvider } from "./InscriptionProvider";
import { InscriptionTextProvider } from "./InscriptionTextProvider";
import { InscriptionColorProvider } from "./InscriptionColorProvider";
import { RibbonProvider } from "./RibbonProvider";

export default function ContextProvider({ children }) {
  return (
    <SizeProvider>
      <FillingProvider>
        <CandleProvider>
          <SparklerProvider>
            <IcingProvider>
              <InscriptionProvider>
                <InscriptionTextProvider>
                  <InscriptionColorProvider>
                    <RibbonProvider>{children}</RibbonProvider>
                  </InscriptionColorProvider>
                </InscriptionTextProvider>
              </InscriptionProvider>
            </IcingProvider>
          </SparklerProvider>
        </CandleProvider>
      </FillingProvider>
    </SizeProvider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
