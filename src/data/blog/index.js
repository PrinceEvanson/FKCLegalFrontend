import willsVsTrusts from "./wills-vs-trusts-generational-wealth";
import localContentBillKenya from "./local-content-bill-kenya";
import counterfeitGoodsKenya from "./counterfeit-goods-kenya";
import stateLandRecords from "./state-land-records-fraudulent-title";
import offPlanSaleAgreements from "./off-plan-sale-agreements-kenya";
import eastAfricaTouristVisa from "./east-africa-tourist-visa";
import residueOfTheLease from "./residue-of-the-lease-kenya";
import gamblingExclusion from "./gambling-exclusion-regulation-78";
import dueDiligenceCommercial from "./due-diligence-commercial-property";
import corporateCompliance from "./corporate-compliance-for-startups";
import fromWorkPermits from "./from-work-permits-to-permanent-residency";
import dismantlingRegulatoryGrayArea from "./dismantling-regulatory-gray-area";
import travelInsuranceMandate from "./travel-insurance-mandate-kenya";

const blogPosts = [
    willsVsTrusts,
    localContentBillKenya,
    counterfeitGoodsKenya,
    stateLandRecords,
    offPlanSaleAgreements,
    eastAfricaTouristVisa,
    residueOfTheLease,
    gamblingExclusion,
    dueDiligenceCommercial,
    corporateCompliance,
    fromWorkPermits,
    dismantlingRegulatoryGrayArea,
    travelInsuranceMandate,
].sort((a, b) => new Date(b.date) - new Date(a.date));

export default blogPosts;