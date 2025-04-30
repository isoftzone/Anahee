import { lazy } from 'react';
import HideSeek from '../pages/Components/HideSeek';
import ImageUpdates from '../pages/Components/ImageUpdate';
import ItemMaster from '../pages/Components/ItemMaster';
import ExchangePolicy from '../pages/Components/ExchangePolicy';
import PrivacyPolicy from '../pages/Components/PrivacyPolicy';
import TermsAndConditions from '../pages/Components/TermsAndConditions';
import ExchangeProcess from '../pages/Components/ExchangeProcess';
import CancellationPolicy from '../pages/Components/CancellationPolicy';
import RefundPolicy from '../pages/Components/RefundPolicy';
import ShippingLocations from '../pages/Components/ShippingLocations';
import TermsOfService from '../pages/Components/TermsOfService';
import DiscountCoupan from '../pages/Components/DiscountCoupon';
import RefferalCoupan from '../pages/Components/ReffralCoupan';
import OrderList from '../pages/Components/OrderList';
import OrderPreview from '../pages/Components/OrderPreview';
import OrderAdd from '../pages/Components/OrderAdd';
import OrderEdit from '../pages/Components/OrderEdit';
import RemoteFromMaster from '../pages/Components/RemoteFromMaster';
import ReportFromStock from '../pages/Components/ReportFromStock';
import FormMaster from '../pages/Components/FormMaster';
import StoreMaster from '../pages/Components/StoreMaster';
import AppVersion from '../pages/Components/AppVersion';
import SmsSetting from '../pages/Components/SmsSetting';
import AddSmsSettings from '../pages/Components/AddSmsSetting';
import PaymentSetting from '../pages/Components/PaymentSetting';
import NotificationKey from '../pages/Components/NotificationKey';
import Report from '../pages/Components/Report';
import ProductWiseReport from '../pages/Components/ProductWiseReport';
import MasterSetting from '../pages/Components/MasterSetting';
import PromotionBanners from '../pages/Components/PromotionBanner';
import AddContact from '../pages/Components/AddContact';
import CustomerList from '../pages/Components/CustomerList';
import AppTheme from '../pages/Components/AppTheme';
import DeliveryCharges from '../pages/Components/DeliveryCharges';
import LoginSettings from '../pages/Components/LoginSettings';
import WalletDetail from '../pages/Components/WalletDetails';
import CaptionMaster from '../pages/Components/CaptionMaster';
import DiscountCouponList from '../pages/Components/DiscountCouponList';
import MinimumBillingSetting from '../pages/Components/MinimumBillingSetting';
import Users from '../pages/Components/Users';
import Register from '../pages/Components/Register';
import Notifications from '../pages/Components/Notifications';
// import CustomersL from '../pages/Components/CustomersL';
import AddCustomer from '../pages/Components/AddCustomer';
import CustomersL from '../pages/Components/CustomerL';
import SocialMediaSettingsPage from '../pages/Components/SocialMediaSettingsPage';
import AboutUs from '../pages/Components/AboutUs';
import ContactUs from '../pages/Components/ContactUs';

// import ExchangePolicy from /ExchangePolicy';
const Index = lazy(() => import('../pages/Index'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Finance = lazy(() => import('../pages/Finance'));
const Crypto = lazy(() => import('../pages/Crypto'));
const Todolist = lazy(() => import('../pages/Apps/Todolist'));
const Mailbox = lazy(() => import('../pages/Apps/Mailbox'));
const Notes = lazy(() => import('../pages/Apps/Notes'));
const Contacts = lazy(() => import('../pages/Apps/Contacts'));
const Chat = lazy(() => import('../pages/Apps/Chat'));
const Scrumboard = lazy(() => import('../pages/Apps/Scrumboard'));
const Calendar = lazy(() => import('../pages/Apps/Calendar'));
const List = lazy(() => import('../pages/Apps/Invoice/List'));
const Preview = lazy(() => import('../pages/Apps/Invoice/Preview'));
const Add = lazy(() => import('../pages/Apps/Invoice/Add'));
const Edit = lazy(() => import('../pages/Apps/Invoice/Edit'));
const Tabs = lazy(() => import('../pages/Components/Tabs'));
const Accordians = lazy(() => import('../pages/Components/Accordians'));
const Modals = lazy(() => import('../pages/Components/Modals'));
const Cards = lazy(() => import('../pages/Components/Cards'));
const Carousel = lazy(() => import('../pages/Components/Carousel'));
const Countdown = lazy(() => import('../pages/Components/Countdown'));
const Counter = lazy(() => import('../pages/Components/Counter'));
const SweetAlert = lazy(() => import('../pages/Components/SweetAlert'));
const Timeline = lazy(() => import('../pages/Components/Timeline'));
const Notification = lazy(() => import('../pages/Components/Notification'));
const MediaObject = lazy(() => import('../pages/Components/MediaObject'));
const ListGroup = lazy(() => import('../pages/Components/ListGroup'));
const PricingTable = lazy(() => import('../pages/Components/PricingTable'));
const LightBox = lazy(() => import('../pages/Components/LightBox'));
const Alerts = lazy(() => import('../pages/Elements/Alerts'));
const Avatar = lazy(() => import('../pages/Elements/Avatar'));
const Badges = lazy(() => import('../pages/Elements/Badges'));
const Breadcrumbs = lazy(() => import('../pages/Elements/Breadcrumbs'));
const Buttons = lazy(() => import('../pages/Elements/Buttons'));
const Buttongroups = lazy(() => import('../pages/Elements/Buttongroups'));
const Colorlibrary = lazy(() => import('../pages/Elements/Colorlibrary'));
const DropdownPage = lazy(() => import('../pages/Elements/DropdownPage'));
const Infobox = lazy(() => import('../pages/Elements/Infobox'));
const Jumbotron = lazy(() => import('../pages/Elements/Jumbotron'));
const Loader = lazy(() => import('../pages/Elements/Loader'));
const Pagination = lazy(() => import('../pages/Elements/Pagination'));
const Popovers = lazy(() => import('../pages/Elements/Popovers'));
const Progressbar = lazy(() => import('../pages/Elements/Progressbar'));
const Search = lazy(() => import('../pages/Elements/Search'));
const Tooltip = lazy(() => import('../pages/Elements/Tooltip'));
const Treeview = lazy(() => import('../pages/Elements/Treeview'));
const Typography = lazy(() => import('../pages/Elements/Typography'));
const Widgets = lazy(() => import('../pages/Widgets'));
const FontIcons = lazy(() => import('../pages/FontIcons'));
const DragAndDrop = lazy(() => import('../pages/DragAndDrop'));
const Tables = lazy(() => import('../pages/Tables'));
const Basic = lazy(() => import('../pages/DataTables/Basic'));
const Advanced = lazy(() => import('../pages/DataTables/Advanced'));
const Items = lazy(() => import('../pages/DataTables/Items'));
const Skin = lazy(() => import('../pages/DataTables/Skin'));
const OrderSorting = lazy(() => import('../pages/DataTables/OrderSorting'));
const Employees = lazy(() => import('../pages/DataTables/Employees'));
const Transport = lazy(() => import('../pages/DataTables/Transport'));
const MultiColumn = lazy(() => import('../pages/DataTables/MultiColumn'));
const MultipleTables = lazy(() => import('../pages/DataTables/MultipleTables'));
const AltPagination = lazy(() => import('../pages/DataTables/AltPagination'));
const Checkbox = lazy(() => import('../pages/DataTables/Checkbox'));
const RangeSearch = lazy(() => import('../pages/DataTables/RangeSearch'));
const Customer = lazy(() => import('../pages/DataTables/Customer'));
const CustomerEnv = lazy(() => import('../pages/DataTables/CustomerEnv'));
const Dealers = lazy(() => import('../pages/DataTables/Dealers'));
const Export = lazy(() => import('../pages/DataTables/Export'));
const ColumnChooser = lazy(() => import('../pages/DataTables/ColumnChooser'));
const Lable = lazy(() => import('../pages/DataTables/Lable'));
const MasterInput = lazy(() => import('../pages/DataTables/MasterInput'));
const FrmCodeType = lazy(() => import('../pages/DataTables/FrmCodeType'));
const BrandItem = lazy(() => import('../pages/StockTables/BrandItem'));
const StockDetail = lazy(() => import('../pages/StockTables/StockDetail'));
const ItemBrand = lazy(() => import('../pages/StockTables/ItemBrand'));
const ItemSize = lazy(() => import('../pages/StockTables/ItemSize'));
const StockReport = lazy(() => import('../pages/StockTables/StockReport'));
const StockSummary = lazy(() => import('../pages/StockTables/StockSummary'));
const StockMovement = lazy(() => import('../pages/StockTables/StockMovement'));
const StockAging = lazy(() => import('../pages/StockTables/StockAging'));
const STI_Detail = lazy(() => import('../pages/StockTransfer/STI_Detail'));
const STI_Summary = lazy(() => import('../pages/StockTransfer/STI_Summary'));
const STO_Detail = lazy(() => import('../pages/StockTransfer/STO_Detail'));
const STO_Summary = lazy(() => import('../pages/StockTransfer/STO_Summary'));
const SellingBrand = lazy(() => import('../pages/SalesTables/BestIn/SellingBrand'));
const SellingProduct = lazy(() => import('../pages/SalesTables/BestIn/SellingProduct'));
const SellingItem = lazy(() => import('../pages/SalesTables/BestIn/SellingItem'));
const SellingCustomer = lazy(() => import('../pages/SalesTables/BestIn/SellingCustomer'));
const SalesComparison = lazy(() => import('../pages/SalesTables/BestIn/SalesComparison'));
const ItemWiseSale = lazy(() => import('../pages/SalesTables/BestIn/ItemWiseSale'));
const CustomerWiseSale = lazy(() => import('../pages/SalesTables/Comparison/CustomerWiseSale'));
const CustomerWiseDetail = lazy(() => import('../pages/SalesTables/Comparison/CustomerWiseDetail'));
const EmployeeSale = lazy(() => import('../pages/SalesTables/Comparison/EmployeeSale'));
const EmpCompare = lazy(() => import('../pages/SalesTables/Comparison/EmpCompare'));
const EmpCompareQty = lazy(() => import('../pages/SalesTables/Comparison/EmpCompareQty'));
const DealerSales = lazy(() => import('../pages/SalesTables/Comparison/DealerSales'));
const DealerCompare = lazy(() => import('../pages/SalesTables/Comparison/DealerCompare'));
const SalesDate = lazy(() => import('../pages/SalesTables/Comparison/SalesDate'));
const ItemSales = lazy(() => import('../pages/SalesTables/Comparison/ItemSales'));
const AgentSales = lazy(() => import('../pages/SalesTables/Comparison/AgentSales'));
const AgentSummary = lazy(() => import('../pages/SalesTables/Comparison/AgentSummary'));
const ConsigneeSummary = lazy(() => import('../pages/SalesTables/Comparison/ConsigneeSummary'));
const DailySales = lazy(() => import('../pages/SalesTables/Comparison/DailySales'));
const ItemTax = lazy(() => import('../pages/SalesTables/Comparison/ItemTax'));
const HelperSales = lazy(() => import('../pages/SalesTables/Comparison/HelperSales'));
const HelperCompare = lazy(() => import('../pages/SalesTables/Comparison/HelperCompare'));
const HelperCompareQty = lazy(() => import('../pages/SalesTables/Comparison/HelperCompareQty'));
const DelChallan = lazy(() => import('../pages/SalesTables/DelChallan'));



const Profile = lazy(() => import('../pages/Users/Profile'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const KnowledgeBase = lazy(() => import('../pages/Pages/KnowledgeBase'));
const ContactUsBoxed = lazy(() => import('../pages/Pages/ContactUsBoxed'));
const ContactUsCover = lazy(() => import('../pages/Pages/ContactUsCover'));
const Faq = lazy(() => import('../pages/Pages/Faq'));
const ComingSoonBoxed = lazy(() => import('../pages/Pages/ComingSoonBoxed'));
const ComingSoonCover = lazy(() => import('../pages/Pages/ComingSoonCover'));
const ERROR404 = lazy(() => import('../pages/Pages/Error404'));
const ERROR500 = lazy(() => import('../pages/Pages/Error500'));
const ERROR503 = lazy(() => import('../pages/Pages/Error503'));
const Maintenence = lazy(() => import('../pages/Pages/Maintenence'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));
const UnlockBoxed = lazy(() => import('../pages/Authentication/UnlockBox'));
const RecoverIdBoxed = lazy(() => import('../pages/Authentication/RecoverIdBox'));
const LoginCover = lazy(() => import('../pages/Authentication/LoginCover'));
const RegisterCover = lazy(() => import('../pages/Authentication/RegisterCover'));
const RecoverIdCover = lazy(() => import('../pages/Authentication/RecoverIdCover'));
const UnlockCover = lazy(() => import('../pages/Authentication/UnlockCover'));
const About = lazy(() => import('../pages/About'));
const Error = lazy(() => import('../components/Error'));
const Charts = lazy(() => import('../pages/Charts'));
const FormBasic = lazy(() => import('../pages/Forms/Basic'));
const FormInputGroup = lazy(() => import('../pages/Forms/InputGroup'));
const FormLayouts = lazy(() => import('../pages/Forms/Layouts'));
const Validation = lazy(() => import('../pages/Forms/Validation'));
const InputMask = lazy(() => import('../pages/Forms/InputMask'));
const Select2 = lazy(() => import('../pages/Forms/Select2'));
const Touchspin = lazy(() => import('../pages/Forms/TouchSpin'));
const CheckBoxRadio = lazy(() => import('../pages/Forms/CheckboxRadio'));
const Switches = lazy(() => import('../pages/Forms/Switches'));
const Wizards = lazy(() => import('../pages/Forms/Wizards'));
const FileUploadPreview = lazy(() => import('../pages/Forms/FileUploadPreview'));
const QuillEditor = lazy(() => import('../pages/Forms/QuillEditor'));
const MarkDownEditor = lazy(() => import('../pages/Forms/MarkDownEditor'));
const DateRangePicker = lazy(() => import('../pages/Forms/DateRangePicker'));
const Clipboard = lazy(() => import('../pages/Forms/Clipboard'));
// import ExchangePolicy from './../../../web/src/pages/other/ExchangePolicy';

const routes = [
    // dashboard
    // {
    //     path: '../pages/Index',
    //     element: <Index />,
    // },
    {
        path: '/index',
        element: <Index />,
    },
    // analytics page
    {
        path: '/analytics',
        element: <Analytics />,
    },
    // finance page
    {
        path: '/finance',
        element: <Finance />,
    },
    // crypto page
    {
        path: '/crypto',
        element: <Crypto />,
    },
    {
        path: '/apps/todolist',
        element: <Todolist />,
    },
    {
        path: '/apps/notes',
        element: <Notes />,
    },
    {
        path: '/apps/contacts',
        element: <Contacts />,
    },
    {
        path: '/apps/mailbox',
        element: <Mailbox />,
    },
    {
        path: '/apps/invoice/list',
        element: <List />,
    },
    // Apps page
    {
        path: '/apps/chat',
        element: <Chat />,
    },
    {
        path: '/apps/scrumboard',
        element: <Scrumboard />,
    },
    {
        path: '/apps/calendar',
        element: <Calendar />,
    },
    // preview page
    {
        path: '/apps/invoice/preview',
        element: <Preview />,
    },
    {
        path: '/apps/invoice/add',
        element: <Add />,
    },
    {
        path: '/apps/invoice/edit',
        element: <Edit />,
    },
    // components page
    {
        path: '/components/tabs',
        element: <Tabs />,
    },
    {
        path: '/components/accordions',
        element: <Accordians />,
    },
    {
        path: '/components/modals',
        element: <Modals />,
    },
    {
        path: '/components/cards',
        element: <Cards />,
    },
    {
        path: '/components/carousel',
        element: <Carousel />,
    },
    {
        path: '/components/countdown',
        element: <Countdown />,
    },
    {
        path: '/components/counter',
        element: <Counter />,
    },
    {
        path: '/components/sweetalert',
        element: <SweetAlert />,
    },
    {
        path: '/components/timeline',
        element: <Timeline />,
    },
    {
        path: '/components/notifications',
        element: <Notification />,
    },
    {
        path: '/components/media-object',
        element: <MediaObject />,
    },
    {
        path: '/Components/layoutsetting',
        element: <HideSeek/>
    },
    {
        path: '/Components/image-update',
        element: <ImageUpdates/>
    },
    {
        path: '/Components/item-master',
        element: <ItemMaster/>
    },
    {
        path: '/Components/remotefromMaster',
        element: <RemoteFromMaster/>
    },
    {
        path: '/Components/formmaster',
        element: <FormMaster/>
    },
    {
        path: '/Components/reportfromstock',
        element: <ReportFromStock/>
    },
    {
        path: '/components/exchange-policy',
        element: <ExchangePolicy/>
    },
    {
        path: '/components/privacy-policy',
        element: <PrivacyPolicy/>
    },
    {
        path: '/components/terms-conditions',
        element: <TermsAndConditions />
    },
    {
        path: '/components/exchange-process',
        element: <ExchangeProcess />
    },
    {
        path: '/components/cancellation-policy',
        element: <CancellationPolicy />
    },
    {
        path: '/components/refund-policy',
        element: <RefundPolicy />
    },
    {
        path: '/components/shipping-locations',
        element: <ShippingLocations />
    },
    {
        path: '/components/terms-service',
        element: <TermsOfService />
    },
    {
        path: '/Components/discountcoupon',
        element: <DiscountCoupan />
    },
    {
        path: '/Components/storemaster',
        element: <StoreMaster />
    },
      {
        path: '/Components/appversion',
        element: <AppVersion />
    },
    {
        path: '/Components/smssetting',
        element: <SmsSetting />
    },
    {
        path: '/Components/addsmssettings',
        element: <AddSmsSettings />
    },
    {
        path: '/Components/paymentsetting',
        element: <PaymentSetting />
    },
    {
        path: '/Components/notificationkey',
        element: <NotificationKey />
    },
    {
        path: '/Components/report',
        element: <Report />
    },
    {
        path: '/Components/productwisereport',
        element: <ProductWiseReport />
    },
    {
        path: '/Components/mastersetting',
        element: <MasterSetting />
    },
    {
        path: '/Components/promotionbanners',
        element: <PromotionBanners />
    },
    {
        path: '/Components/addcontact',
        element: <AddContact />
    },
    {
        path: '/Components/apptheme',
        element: <AppTheme />
    },
    {
        path: '/Components/deliverycharges',
        element: <DeliveryCharges />
    },
    {
        path: '/Components/loginsettings',
        element: <LoginSettings />
    },
    {
        path: '/Components/walletdetail',
        element: <WalletDetail />
    },
    {
        path: '/Components/captionmaster',
        element: <CaptionMaster />
    },
    {
        path: '/Components/discountcouponlist',
        element: <DiscountCouponList />
    },
    {
        path: '/Components/minimumbillingsetting',
        element: <MinimumBillingSetting />
    },
    {
        path: '/Components/users',
        element: <Users />
    },
    {
        path: '/Components/Register',
        element: <Register/>
    },
    {
        path: '/Components/Customerl',
        element: <CustomersL/>
    },
    {
        path: '/components/AddCustomers',
        element: <AddCustomer/>
    },
    {
        path: '/Components/notification',
        element: <Notifications/>
    },
    {
        path: '/Components/customerlist',
        element: <CustomerList />
    },
    {
        path: '/Components/socialmediasettingspage',
        element: <SocialMediaSettingsPage />
    },
    {
        path: '/Components/aboutus',
        element: <AboutUs />
    },
    {
        path: '/Components/contactus',
        element: <ContactUs />
    },
    {
        path: '/Components/refferalcoupan',
        element: <RefferalCoupan />
    },
    {
        path: '/Components/orderlist',
        element: <OrderList />
    },
    {
        path: '/Components/orderpreview',
        element: <OrderPreview />
    },
    {
        path: '/Components/orderadd',
        element: <OrderAdd />
    },
    {
        path: '/Components/orderedit',
        element: <OrderEdit />
    },
    {
        path: '/components/list-group',
        element: <ListGroup />,
    },
    {
        path: '/components/pricing-table',
        element: <PricingTable />,
    },
    {
        path: '/components/lightbox',
        element: <LightBox />,
    },
    // elements page
    {
        path: '/elements/alerts',
        element: <Alerts />,
    },
    {
        path: '/elements/avatar',
        element: <Avatar />,
    },
    {
        path: '/elements/badges',
        element: <Badges />,
    },
    {
        path: '/elements/breadcrumbs',
        element: <Breadcrumbs />,
    },
    {
        path: '/elements/buttons',
        element: <Buttons />,
    },
    {
        path: '/elements/buttons-group',
        element: <Buttongroups />,
    },
    {
        path: '/elements/color-library',
        element: <Colorlibrary />,
    },
    {
        path: '/elements/dropdown',
        element: <DropdownPage />,
    },
    {
        path: '/elements/infobox',
        element: <Infobox />,
    },
    {
        path: '/elements/jumbotron',
        element: <Jumbotron />,
    },
    {
        path: '/elements/loader',
        element: <Loader />,
    },
    {
        path: '/elements/pagination',
        element: <Pagination />,
    },
    {
        path: '/elements/popovers',
        element: <Popovers />,
    },
    {
        path: '/elements/progress-bar',
        element: <Progressbar />,
    },
    {
        path: '/elements/search',
        element: <Search />,
    },
    {
        path: '/elements/tooltips',
        element: <Tooltip />,
    },
    {
        path: '/elements/treeview',
        element: <Treeview />,
    },
    {
        path: '/elements/typography',
        element: <Typography />,
    },

    // charts page
    {
        path: '/charts',
        element: <Charts />,
    },
    // widgets page
    {
        path: '/widgets',
        element: <Widgets />,
    },
    //  font-icons page
    {
        path: '/font-icons',
        element: <FontIcons />,
    },
    //  Drag And Drop page
    {
        path: '/dragndrop',
        element: <DragAndDrop />,
    },
    //  Tables page
    {
        path: '/tables',
        element: <Tables />,
    },
    // Data Tables
    {
        path: '/datatables/basic',
        element: <Basic />,
    },
    {
    path: '/datatables/customer',
        element: <Customer />,
    },
    {
        path:'/datatables/transport',
        element: <Transport />
    },
    {
    path: '/datatables/employees',
        element: <Employees />,
    },
    {
        path: '/datatables/dealers',
            element: <Dealers />,
        },
        {
            path: '/datatables/items',
                element: <Items />,
            },
            {
                path: '/datatables/customer_env',
                    element: <CustomerEnv /> ,
                },
    {
        path: '/datatables/advanced',
        element: <Advanced />,
    },
    {
        path: '/datatables/skin',
        element: <Skin />,
    },
    {
        path: '/datatables/order-sorting',
        element: <OrderSorting />,
    },
    {
        path: '/datatables/multi-column',
        element: <MultiColumn />,
    },
    {
        path: '/datatables/multiple-tables',
        element: <MultipleTables />,
    },
    {
        path: '/datatables/alt-pagination',
        element: <AltPagination />,
    },
    {
        path: '/datatables/checkbox',
        element: <Checkbox />,
    },
    {
        path: '/datatables/range-search',
        element: <RangeSearch />,
    },
    {
        path: '/datatables/export',
        element: <Export />,
    },
    {
        path: '/datatables/column-chooser',
        element: <ColumnChooser />,
    },
    {
        path: '/datatables/lable',
        element: <Lable />,
    },
    {
        path: '/datatables/masterInput',
        element: <MasterInput />  ,
    },
    {
        path: '/datatables/frmCodeType',
        element: <FrmCodeType />  ,
        
    },

    //StockTables
    {
        path: '/stockTables/stockDetail',
        element: <StockDetail />,
    },
    {
        path: '/stockTables/brandItem',
        element: <BrandItem />,
    },
    {
        path: '/stockTables/itemBrand',
        element: <ItemBrand /> ,
    },
    {
        path: '/stockTables/itemSize',
        element: <ItemSize /> ,
    },
    {
        path: '/stockTables/stockReport',
        element: <StockReport /> ,
    },
    {
        path: '/stockTables/stockSummary',
        element: <StockSummary /> ,
    },
    {
        path: '/stockTables/stockMovement',
        element: <StockMovement />,
    },
    {
        path: '/stockTables/stockAging',
        element: <StockAging />,
    },

    //Stock Transfer
    {
        path: '/stock_Transfer/sti_Detail',
        element: <STI_Detail />
    },
    {
        path: '/stock_Transfer/sti_Summary',
        element: <STI_Summary />
    },
    {
        path: '/stock_Transfer/sto_Detail',
        element: <STO_Detail />
    },
    {
        path: '/stock_Transfer/sto_Summary',
        element: <STO_Summary />
    },

    //Sales Table
    {
        path:'/salesTables/sellingBrand',
        element: <SellingBrand />
    },
    {
        path:'/salesTables/sellingProduct',
        element: <SellingProduct />
    },
    {
        path:'/salesTables/sellingItem',
        element: <SellingItem />
    },
    {
        path:'/salesTables/sellingCustomer',
        element: <SellingCustomer />
    },
    {
        path:'/salesTables/salesComparison',
        element: <SalesComparison />
    },
    {
        path:'/salesTables/itemWiseSale',
        element: <ItemWiseSale />
    },
    
    //Sales Table/ Comparison
    {
        path:'/salesTables/comparison/customerWiseSale',
        element: <CustomerWiseSale />
    },
    {
        path:'/salesTables/comparison/customerWiseDetail',
        element: <CustomerWiseDetail />
    },
    {
        path:'/salesTables/comparison/employeeSale',
        element: <EmployeeSale />
    },
    {
        path:'/salesTables/comparison/empCompare',
        element: <EmpCompare />
    },
    {
        path:'/salesTables/comparison/empCompareQty',
        element: <EmpCompareQty />
    },
    {
        path:'/salesTables/comparison/dealerSales',
        element: <DealerSales />
    },
    {
        path:'/salesTables/comparison/dealerCompare',
        element: <DealerCompare />
    },
    {
        path:'/salesTables/comparison/salesDate',
        element: <SalesDate />
    },
    {
        path:'/salesTables/comparison/itemSales',
        element: <ItemSales />
    },
    {
        path:'/salesTables/comparison/agentSales',
        element: <AgentSales />
    },
    {
        path:'/salesTables/comparison/agentSummary',
        element: <AgentSummary />
    },
    {
        path:'/salesTables/comparison/consigneeSummary',
        element: <ConsigneeSummary />
    },
    {
        path:'/salesTables/comparison/dailySales',
        element: <DailySales />
    },
    {
        path:'/salesTables/comparison/itemTax',
        element: <ItemTax />
    },
    {
        path:'/salesTables/comparison/helperSales',
        element: <HelperSales />
    },
    {
        path:'/salesTables/comparison/helperCompare',
        element: <HelperCompare />
    },
    {
        path:'/salesTables/comparison/helperCompareQty',
        element: <HelperCompareQty />
    },

    {
        path:'/salesTables/delChallan',
        element: <DelChallan />
    },
   
    
    
    // Users page
    {
        path: '/users/profile',
        element: <Profile />,
    },
    {
        path: '/users/user-account-settings',
        element: <AccountSetting />,
    },
    // pages
    {
        path: '/pages/knowledge-base',
        element: <KnowledgeBase />,
    },
    {
        path: '/pages/contact-us-boxed',
        element: <ContactUsBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/contact-us-cover',
        element: <ContactUsCover />,
        layout: 'blank',
    },
    {
        path: '/pages/faq',
        element: <Faq />,
    },
    {
        path: '/pages/coming-soon-boxed',
        element: <ComingSoonBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/coming-soon-cover',
        element: <ComingSoonCover />,
        layout: 'blank',
    },
    {
        path: '/pages/error404',
        element: <ERROR404 />,
        layout: 'blank',
    },
    {
        path: '/pages/error500',
        element: <ERROR500 />,
        layout: 'blank',
    },
    {
        path: '/pages/error503',
        element: <ERROR503 />,
        layout: 'blank',
    },
    {
        path: '/pages/maintenence',
        element: <Maintenence />,
        layout: 'blank',
    },
    //Authentication
    {
        path: '/auth/boxed-signin',
        element: <LoginBoxed />,
        layout: 'blank',
    },
   
    {
        path: '/auth/boxed-signup',
        element: <RegisterBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-lockscreen',
        element: <UnlockBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-password-reset',
        element: <RecoverIdBoxed />,
        layout: 'blank',
    },
    {
        path: '/',
        element: <LoginCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-register',
        element: <RegisterCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-lockscreen',
        element: <UnlockCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-password-reset',
        element: <RecoverIdCover />,
        layout: 'blank',
    },
    //forms page
    {
        path: '/forms/basic',
        element: <FormBasic />,
    },
    {
        path: '/forms/basic/:id',
        element: <FormBasic />,
    },

    {
        path: '/forms/input-group',
        element: <FormInputGroup />,
    },
    {
        path: '/forms/layouts',
        element: <FormLayouts />,
    },
    {
        path: '/forms/validation',
        element: <Validation />,
    },
    {
        path: '/forms/input-mask',
        element: <InputMask />,
    },
    {
        path: '/forms/select2',
        element: <Select2 />,
    },
    {
        path: '/forms/touchspin',
        element: <Touchspin />,
    },
    {
        path: '/forms/checkbox-radio',
        element: <CheckBoxRadio />,
    },
    {
        path: '/forms/switches',
        element: <Switches />,
    },
    {
        path: '/forms/wizards',
        element: <Wizards />,
    },
    {
        path: '/forms/file-upload',
        element: <FileUploadPreview />,
    },
    {
        path: '/forms/quill-editor',
        element: <QuillEditor />,
    },
    {
        path: '/forms/markdown-editor',
        element: <MarkDownEditor />,
    },
    {
        path: '/forms/date-picker',
        element: <DateRangePicker />,
    },
    {
        path: '/forms/clipboard',
        element: <Clipboard />,
    },
    {
        path: '/about',
        element: <About />,
        layout: 'blank',
    },
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
