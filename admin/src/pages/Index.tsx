import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import ReactApexChart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dropdown from '../components/Dropdown';
import { setPageTitle } from '../store/themeConfigSlice';
import IconHorizontalDots from '../components/Icon/IconHorizontalDots';
import IconDollarSign from '../components/Icon/IconDollarSign';
import IconInbox from '../components/Icon/IconInbox';
import IconTag from '../components/Icon/IconTag';
import IconCreditCard from '../components/Icon/IconCreditCard';
import IconShoppingCart from '../components/Icon/IconShoppingCart';
import IconArrowLeft from '../components/Icon/IconArrowLeft';
import IconCashBanknotes from '../components/Icon/IconCashBanknotes';
import IconUser from '../components/Icon/IconUser';
import IconNetflix from '../components/Icon/IconNetflix';
import IconBolt from '../components/Icon/IconBolt';
import IconCaretDown from '../components/Icon/IconCaretDown';
import IconPlus from '../components/Icon/IconPlus';
import IconMultipleForwardRight from '../components/Icon/IconMultipleForwardRight';

const Index = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Sales Admin'));
    });
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [loading] = useState(false);

    //Revenue Chart
    const revenueChart: any = {
        series: [
            {
                name: 'Income',
                data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
            },
            {
                name: 'Expenses',
                data: [16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000, 18000, 19000],
            },
        ],
        options: {
            chart: {
                height: 325,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },

            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: isDark ? ['#2196F3', '#E7515A'] : ['#1B55E2', '#E7515A'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: '#1B55E2',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
                        fillColor: '#E7515A',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: isRtl ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value: number) => {
                        return value / 1000 + 'K';
                    },
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: isDark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: isDark ? [100, 100] : [45, 100],
                },
            },
        },
    };

    //Sales By Category
    const salesByCategory: any = {
        series: [985, 737, 270],
        options: {
            chart: {
                type: 'donut',
                height: 460,
                fontFamily: 'Nunito, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 25,
                colors: isDark ? '#0e1726' : '#fff',
            },
            colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: 20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '29px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '26px',
                                color: isDark ? '#bfc9d4' : undefined,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '29px',
                                formatter: (w: any) => {
                                    return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },
            },
            labels: ['Apparel', 'Sports', 'Others'],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
        },
    };

    //Daily Sales
    const dailySales: any = {
        series: [
            {
                name: 'Sales',
                data: [44, 55, 41, 67, 22, 43, 21],
            },
            {
                name: 'Last Week',
                data: [13, 23, 20, 8, 13, 27, 33],
            },
        ],
        options: {
            chart: {
                height: 160,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
                stacked: true,
                stackType: '100%',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 1,
            },
            colors: ['#e2a03f', '#e0e6ed'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0,
                        },
                    },
                },
            ],
            xaxis: {
                labels: {
                    show: false,
                },
                categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
            },
            yaxis: {
                show: false,
            },
            fill: {
                opacity: 1,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '25%',
                },
            },
            legend: {
                show: false,
            },
            grid: {
                show: false,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 10,
                    right: -20,
                    bottom: -20,
                    left: -20,
                },
            },
        },
    };

    //Total Orders
    const totalOrders: any = {
        series: [
            {
                name: 'Sales',
                data: [28, 40, 36, 52, 38, 60, 38, 52, 36, 40],
            },
        ],
        options: {
            chart: {
                height: 290,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: isDark ? ['#00ab55'] : ['#00ab55'],
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            yaxis: {
                min: 0,
                show: false,
            },
            grid: {
                padding: {
                    top: 125,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            fill: {
                opacity: 1,
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: 0.3,
                    opacityTo: 0.05,
                    stops: [100, 100],
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
            },
        },
    };

    return (
       <div>
  <ul className="flex space-x-2 rtl:space-x-reverse">
    <li>
      <Link to="/" className="text-primary hover:underline">
        Dashboard
      </Link>
    </li>
    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
      <span>Sales</span>
    </li>
  </ul>

  <div className="pt-5">
    {/* First Row - Revenue and Sales By Category */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div className="panel h-full lg:col-span-2">
        <div className="flex items-center justify-between dark:text-white-light mb-5">
          <h5 className="font-semibold text-lg">Revenue</h5>
          <div className="dropdown">
            <Dropdown
              offset={[0, 1]}
              placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
              button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
            >
              <ul>
                <li><button type="button">Weekly</button></li>
                <li><button type="button">Monthly</button></li>
                <li><button type="button">Yearly</button></li>
              </ul>
            </Dropdown>
          </div>
        </div>
        <p className="text-lg dark:text-white-light/90">
          Total Profit <span className="text-primary ml-2">$10,840</span>
        </p>
        <div className="relative">
          <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
            {loading ? (
              <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex"></span>
              </div>
            ) : (
              <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={325} />
            )}
          </div>
        </div>
      </div>

      <div className="panel h-full">
        <div className="flex items-center mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Sales By Category</h5>
        </div>
        <div>
          <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
            {loading ? (
              <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex"></span>
              </div>
            ) : (
              <ReactApexChart series={salesByCategory.series} options={salesByCategory.options} type="donut" height={325} />
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Second Row - Daily Sales, Summary, Total Orders */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <div className="panel h-full md:col-span-2 lg:col-span-1">
        <div className="flex items-center mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">
            Daily Sales
            <span className="block text-white-dark text-sm font-normal">Go to columns for details.</span>
          </h5>
          <div className="ltr:ml-auto rtl:mr-auto relative">
            <div className="w-11 h-11 text-warning bg-[#ffeccb] dark:bg-warning dark:text-[#ffeccb] grid place-content-center rounded-full">
              <IconDollarSign />
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
            {loading ? (
              <div className="min-h-[160px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex"></span>
              </div>
            ) : (
              <ReactApexChart series={dailySales.series} options={dailySales.options} type="bar" height={160} />
            )}
          </div>
        </div>
      </div>
      
      <div className="panel h-full">
        <div className="flex items-center justify-between dark:text-white-light mb-5">
          <h5 className="font-semibold text-lg">Summary</h5>
          <div className="dropdown">
            <Dropdown
              placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
              button={<IconHorizontalDots className="w-5 h-5 text-black/70 dark:text-white/70 hover:!text-primary" />}
            >
              <ul>
                <li><button type="button">View Report</button></li>
                <li><button type="button">Edit Report</button></li>
                <li><button type="button">Mark as Done</button></li>
              </ul>
            </Dropdown>
          </div>
        </div>
        <div className="space-y-9">
          <div className="flex items-center">
            <div className="w-9 h-9 ltr:mr-3 rtl:ml-3">
              <div className="bg-secondary-light dark:bg-secondary text-secondary dark:text-secondary-light rounded-full w-9 h-9 grid place-content-center">
                <IconInbox />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex font-semibold text-white-dark mb-2">
                <h6>Income</h6>
                <p className="ltr:ml-auto rtl:mr-auto">$92,600</p>
              </div>
              <div className="rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow">
                <div className="bg-gradient-to-r from-[#7579ff] to-[#b224ef] w-11/12 h-full rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-9 h-9 ltr:mr-3 rtl:ml-3">
              <div className="bg-success-light dark:bg-success text-success dark:text-success-light rounded-full w-9 h-9 grid place-content-center">
                <IconTag />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex font-semibold text-white-dark mb-2">
                <h6>Profit</h6>
                <p className="ltr:ml-auto rtl:mr-auto">$37,515</p>
              </div>
              <div className="w-full rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow">
                <div className="bg-gradient-to-r from-[#3cba92] to-[#0ba360] w-full h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-9 h-9 ltr:mr-3 rtl:ml-3">
              <div className="bg-warning-light dark:bg-warning text-warning dark:text-warning-light rounded-full w-9 h-9 grid place-content-center">
                <IconCreditCard />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex font-semibold text-white-dark mb-2">
                <h6>Expenses</h6>
                <p className="ltr:ml-auto rtl:mr-auto">$55,085</p>
              </div>
              <div className="w-full rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow">
                <div className="bg-gradient-to-r from-[#f09819] to-[#ff5858] w-full h-full rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel h-full p-0">
        <div className="flex items-center justify-between w-full p-5 absolute">
          <div className="relative">
            <div className="text-success dark:text-success-light bg-success-light dark:bg-success w-11 h-11 rounded-lg flex items-center justify-center">
              <IconShoppingCart />
            </div>
          </div>
          <h5 className="font-semibold text-2xl ltr:text-right rtl:text-left dark:text-white-light">
            3,192
            <span className="block text-sm font-normal">Total Orders</span>
          </h5>
        </div>
        <div className="bg-transparent rounded-lg overflow-hidden">
          {loading ? (
            <div className="min-h-[290px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
              <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex"></span>
            </div>
          ) : (
            <ReactApexChart series={totalOrders.series} options={totalOrders.options} type="area" height={290} />
          )}
        </div>
      </div>
    </div>

    {/* Third Row - Recent Activities, Transactions, Wallet */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <div className="panel h-full md:col-span-2 lg:col-span-1 pb-0">
        <h5 className="font-semibold text-lg dark:text-white-light mb-5">Recent Activities</h5>
        <PerfectScrollbar className="relative h-[290px] ltr:pr-3 rtl:pl-3 ltr:-mr-3 rtl:-ml-3 mb-4">
          <div className="text-sm cursor-pointer">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) => (
              <div key={item} className="flex items-center py-1.5 relative group">
                <div className="bg-primary w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                <div className="flex-1">Activity {item}</div>
                <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">Just Now</div>
                <span className="badge badge-outline-primary absolute ltr:right-0 rtl:left-0 text-xs bg-primary-light dark:bg-black opacity-0 group-hover:opacity-100">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </PerfectScrollbar>
        <div className="border-t border-white-light dark:border-white/10">
          <Link to="/" className="font-semibold group hover:text-primary p-4 flex items-center justify-center group">
            View All
            <IconArrowLeft className="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition duration-300 ltr:ml-1 rtl:mr-1" />
          </Link>
        </div>
      </div>
      
      <div className="panel h-full">
        <div className="flex items-center justify-between dark:text-white-light mb-5">
          <h5 className="font-semibold text-lg">Transactions</h5>
          <div className="dropdown">
            <Dropdown placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`} button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}>
              <ul>
                <li><button type="button">View Report</button></li>
                <li><button type="button">Edit Report</button></li>
                <li><button type="button">Mark as Done</button></li>
              </ul>
            </Dropdown>
          </div>
        </div>
        <div>
          <div className="space-y-6">
            {[
              { icon: 'SP', color: 'success', name: 'Shaun Park', time: '10 Jan 1:00PM', amount: '+$36.11' },
              { icon: <IconCashBanknotes />, color: 'warning', name: 'Cash withdrawal', time: '04 Jan 1:00PM', amount: '-$16.44' },
              { icon: <IconUser className="w-6 h-6" />, color: 'danger', name: 'Amy Diaz', time: '10 Jan 1:00PM', amount: '+$66.44' },
              { icon: <IconNetflix />, color: 'secondary', name: 'Netflix', time: '04 Jan 1:00PM', amount: '-$32.00' },
              { icon: 'DA', color: 'info', name: 'Daisy Anderson', time: '10 Jan 1:00PM', amount: '+$10.08' },
              { icon: <IconBolt />, color: 'primary', name: 'Electricity Bill', time: '04 Jan 1:00PM', amount: '-$22.00' }
            ].map((item, index) => (
              <div key={index} className="flex">
                <span className={`shrink-0 grid place-content-center ${typeof item.icon === 'string' ? 'text-base' : ''} w-9 h-9 rounded-md bg-${item.color}-light dark:bg-${item.color} text-${item.color} dark:text-${item.color}-light`}>
                  {item.icon}
                </span>
                <div className="px-3 flex-1">
                  <div>{item.name}</div>
                  <div className="text-xs text-white-dark dark:text-gray-500">{item.time}</div>
                </div>
                <span className={`text-${item.amount.startsWith('+') ? 'success' : 'danger'} text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre`}>
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel h-full p-0 border-0 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-[#4361ee] to-[#160f6b] min-h-[190px]">
          <div className="flex justify-between items-center mb-6">
            <div className="bg-black/50 rounded-full p-1 ltr:pr-3 rtl:pl-3 flex items-center text-white font-semibold">
              <img className="w-8 h-8 rounded-full border-2 border-white/50 block object-cover ltr:mr-1 rtl:ml-1" src="/assets/images/profile-34.jpeg" alt="avatar" />
              Alan Green
            </div>
            <button type="button" className="ltr:ml-auto rtl:mr-auto flex items-center justify-between w-9 h-9 bg-black text-white rounded-md hover:opacity-80">
              <IconPlus className="w-6 h-6 m-auto" />
            </button>
          </div>
          <div className="text-white flex justify-between items-center">
            <p className="text-xl">Wallet Balance</p>
            <h5 className="ltr:ml-auto rtl:mr-auto text-2xl">
              <span className="text-white-light">$</span>2953
            </h5>
          </div>
        </div>
        <div className="-mt-12 px-8 grid grid-cols-2 gap-2">
          <div className="bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]">
            <span className="flex justify-between items-center mb-4 dark:text-white">
              Received
              <IconCaretDown className="w-4 h-4 text-success rotate-180" />
            </span>
            <div className="btn w-full py-1 text-base shadow-none border-0 bg-[#ebedf2] dark:bg-black text-[#515365] dark:text-[#bfc9d4]">$97.99</div>
          </div>
          <div className="bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]">
            <span className="flex justify-between items-center mb-4 dark:text-white">
              Spent
              <IconCaretDown className="w-4 h-4 text-danger" />
            </span>
            <div className="btn w-full py-1 text-base shadow-none border-0 bg-[#ebedf2] dark:bg-black text-[#515365] dark:text-[#bfc9d4]">$53.00</div>
          </div>
        </div>
        <div className="p-5">
          <div className="mb-5">
            <span className="bg-[#1b2e4b] text-white text-xs rounded-full px-4 py-1.5 before:bg-white before:w-1.5 before:h-1.5 before:rounded-full ltr:before:mr-2 rtl:before:ml-2 before:inline-block">
              Pending
            </span>
          </div>
          <div className="mb-5 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-[#515365] font-semibold">Netflix</p>
              <p className="text-base">
                <span>$</span> <span className="font-semibold">13.85</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#515365] font-semibold">BlueHost VPN</p>
              <p className="text-base">
                <span>$</span> <span className="font-semibold">15.66</span>
              </p>
            </div>
          </div>
          <div className="text-center px-2 flex flex-col sm:flex-row justify-around gap-2">
            <button type="button" className="btn btn-secondary">
              View Details
            </button>
            <button type="button" className="btn btn-success">
              Pay Now $29.51
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Fourth Row - Recent Orders and Top Selling Product */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="panel h-full w-full">
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Recent Orders</h5>
        </div>
        <div className="table-responsive">
          <table className="w-full">
            <thead>
              <tr>
                <th className="ltr:rounded-l-md rtl:rounded-r-md">Customer</th>
                <th>Product</th>
                <th>Invoice</th>
                <th>Price</th>
                <th className="ltr:rounded-r-md rtl:rounded-l-md">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { img: '/assets/images/profile-6.jpeg', name: 'Luke Ivory', product: 'Headphone', invoice: '#46894', price: '$56.07', status: 'Paid', statusColor: 'success' },
                { img: '/assets/images/profile-7.jpeg', name: 'Andy King', product: 'Nike Sport', invoice: '#76894', price: '$126.04', status: 'Shipped', statusColor: 'secondary' },
                { img: '/assets/images/profile-8.jpeg', name: 'Laurie Fox', product: 'Sunglasses', invoice: '#66894', price: '$56.07', status: 'Paid', statusColor: 'success' },
                { img: '/assets/images/profile-9.jpeg', name: 'Ryan Collins', product: 'Sport', invoice: '#75844', price: '$110.00', status: 'Shipped', statusColor: 'secondary' },
                { img: '/assets/images/profile-10.jpeg', name: 'Irene Collins', product: 'Speakers', invoice: '#46894', price: '$56.07', status: 'Paid', statusColor: 'success' }
              ].map((item, index) => (
                <tr key={index} className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                  <td className="min-w-[150px] text-black dark:text-white">
                    <div className="flex items-center">
                      <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src={item.img} alt="avatar" />
                      <span className="whitespace-nowrap">{item.name}</span>
                    </div>
                  </td>
                  <td className={`text-${item.product === 'Headphone' ? 'primary' : item.product === 'Nike Sport' ? 'info' : item.product === 'Sunglasses' ? 'warning' : item.product === 'Sport' ? 'danger' : 'secondary'}`}>
                    {item.product}
                  </td>
                  <td>
                    <Link to="/apps/invoice/preview">{item.invoice}</Link>
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <span className={`badge bg-${item.statusColor} shadow-md dark:group-hover:bg-transparent`}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel h-full w-full">
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Top Selling Product</h5>
        </div>
        <div className="table-responsive">
          <table className="w-full">
            <thead>
              <tr className="border-b-0">
                <th className="ltr:rounded-l-md rtl:rounded-r-md">Product</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Sold</th>
                <th className="ltr:rounded-r-md rtl:rounded-l-md">Source</th>
              </tr>
            </thead>
            <tbody>
              {[
                { img: '/assets/images/product-headphones.jpg', name: 'Headphone', type: 'Digital', price: '$168.09', discount: '$60.09', sold: '170', source: 'Direct', sourceColor: 'danger' },
                { img: '/assets/images/product-shoes.jpg', name: 'Shoes', type: 'Faishon', price: '$126.04', discount: '$47.09', sold: '130', source: 'Google', sourceColor: 'success' },
                { img: '/assets/images/product-watch.jpg', name: 'Watch', type: 'Accessories', price: '$56.07', discount: '$20.00', sold: '66', source: 'Ads', sourceColor: 'warning' },
                { img: '/assets/images/product-laptop.jpg', name: 'Laptop', type: 'Digital', price: '$110.00', discount: '$33.00', sold: '35', source: 'Email', sourceColor: 'secondary' },
                { img: '/assets/images/product-camera.jpg', name: 'Camera', type: 'Digital', price: '$56.07', discount: '$26.04', sold: '30', source: 'Referral', sourceColor: 'primary' }
              ].map((item, index) => (
                <tr key={index} className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                  <td className="min-w-[150px] text-black dark:text-white">
                    <div className="flex">
                      <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src={item.img} alt="avatar" />
                      <p className="whitespace-nowrap">
                        {item.name}
                        <span className={`text-${item.type === 'Digital' ? 'primary' : item.type === 'Faishon' ? 'warning' : 'danger'} block text-xs`}>{item.type}</span>
                      </p>
                    </div>
                  </td>
                  <td>{item.price}</td>
                  <td>{item.discount}</td>
                  <td>{item.sold}</td>
                  <td>
                    <Link className={`text-${item.sourceColor} flex items-center`} to="/">
                      <IconMultipleForwardRight className="rtl:rotate-180 ltr:mr-1 rtl:ml-1" />
                      {item.source}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
    );
};

export default Index;
