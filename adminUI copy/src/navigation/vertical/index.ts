// ** Icon imports
import { Eye } from '@medusajs/icons'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import ArchiveOutline from 'mdi-material-ui/ArchiveOutline'
import CalendarBlankOutline from 'mdi-material-ui/CalendarBlankOutline'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import CheckboxMarkedCircleOutline from 'mdi-material-ui/CheckboxMarkedCircleOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import DotsHorizontal from 'mdi-material-ui/DotsHorizontal'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import FormSelect from 'mdi-material-ui/FormSelect'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import LockOutline from 'mdi-material-ui/LockOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import PackageVariantClosed from 'mdi-material-ui/PackageVariantClosed'
import ShieldOutline from 'mdi-material-ui/ShieldOutline'
import Table from 'mdi-material-ui/Table'
import VectorArrangeBelow from 'mdi-material-ui/VectorArrangeBelow'

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import BusinessIcon from '@mui/icons-material/Business'
import DiscountIcon from '@mui/icons-material/Discount'
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import NotificationAddIcon from '@mui/icons-material/NotificationAdd'
import SettingsIcon from '@mui/icons-material/Settings'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined'
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboards',
      icon: HomeOutline,
      badgeContent: 'new',
      badgeColor: 'error',
      children: [
        {
          title: 'Summary Statistics',
          icon: DashboardIcon,
          path: '/dashboards/cars'
        },

        // {
        //   title: 'Recent Activities',
        //   path: '/dashboards/enquiries'
        // },
        // {
        //   title: 'Alerts & Notifications',
        //   path: '/dashboards/users'
        // }
      ]
    },
    {
      title: 'Car',
      icon: DirectionsCarIcon,
      children: [
        {
          icon: Eye,
          title: 'View Car',
          path: '/cars/view'
        },
        {
          title: 'Add Car',
          icon: AddCircleOutlineOutlinedIcon,
          path: '/cars/add'
        }

        // {
        //   title: 'Update Car',
        //   path: '/cars/update'
        // }
      ]
    },
    {
      title: 'Enquiry',
      icon: NotificationAddIcon,
      children: [
        {
          icon: Eye,
          title: 'View Enquiry',
          path: '/enquiry/view'
        },
        {
          title: 'Accepted Enquiry',
          icon: CheckCircleOutlinedIcon,
          path: '/enquiry/accepted'
        },
        {
          title: 'Rejected Enquiry',
          icon: DangerousOutlinedIcon,
          path: '/enquiry/rejected'
        }
      ]
    },
    {
      title: 'Address',
      icon: BusinessIcon,
      children: [
        {
          icon: Eye,
          title: 'View Address',
          path: '/addresses/view'
        },
        {
          title: 'Add Address',
          icon: AddCircleOutlineOutlinedIcon,
          path: '/addresses/add'
        },
        // {
        //   title: 'Update Address',
        //   icon: UpgradeOutlinedIcon,
        //   path: '/addresses/update'
        // }
      ]
    },
    {
      title: 'User Management',
      icon: BusinessIcon,
      children: [
        {
          icon: Eye,
          title: 'Admin and Staff',
          children:[
            {
              title: 'Add Staff',
            path: '/admin/staff/create',
            },
            {
              title: 'View Staff',
            path: '/admin/staff/view',
            },
            {
              title: 'Update Staff',
            path: '/admin/staff/update',
            },
            {
              title:'Role-based access control (RBAC).',
              path:'/admin/staff/rbac'
            }

          ],

          
        },
        {
          title:'Customer',
          children:[
            {
              title: 'View customer profiles',
              path: '/admin/customer/view'
            },
            {
              title: 'Booking history',
              path: '/admin/customer/bookingHistory'
            }
          ]
        }
       
      ]
    },
    {
      title: 'Marketing Tools',
      icon: BusinessIcon,
      children: [
        {
          title: 'Promotion',
          icon: LocalOfferIcon,
          children: [
            {
              icon: Eye,
              title: 'View Promotion',
              path: '/promotion/view'
            },
            {
              title: 'Add Promotion',
              path: '/promotion/add'
            },
            {
              title: 'Update Promotion',
              path: '/promotion/update'
            }
          ]
        },

        
    {
      title: 'Offer',
      icon: DiscountIcon,
      children: [
        {
          icon: Eye,
          title: 'View Offer',
          path: '/offers/view'
        },
        {
          title: 'Add Offer',
          icon: AddCircleOutlineOutlinedIcon,
          path: '/offers/add'
        },
        {
          title: 'Update Offer',
          icon: UpgradeOutlinedIcon,
          path: '/offers/update'
        }
      ]
    },
    
       
      ]
    },
    

    {
      title: 'Branch',
      icon: EmojiTransportationIcon,
      children: [
        {
          icon: Eye,
          title: 'View Branch',
          path: '/branches/view'
        },
        {
          title: 'Add Branch',
          path: '/branches/add'
        },
        {
          title: 'Update Branch',
          path: '/branches/update'
        }
      ]
    }, 
  
    
 
 
    {
      title: 'Leads Management',
      icon: AccountBalanceWalletIcon,
      children: [
        {
          icon: Eye,
          title: 'View leads',
          path: '/leads/view'
        },
        // {
        //   title: 'Add Transactions',
        //   icon: AddCircleOutlineOutlinedIcon,
        //   path: '/transactions/add'
        // },
        // {
        //   title: 'Update Transactions',
        //   icon: UpgradeOutlinedIcon,
        //   path: '/transactions/update'
        // }
      ]
    },
    {
      title: 'Settings',
      icon: SettingsIcon,
      children: [
        {
          icon: Eye,
          title: 'View Settings',
          path: '/settings/view'
        },
        {
          title: 'Add Settings',
          icon: AddCircleOutlineOutlinedIcon,
          path: '/settings/add'
        },
        {
          title: 'Update Settings',
          icon: UpgradeOutlinedIcon,
          path: '/settings/update'
        }
      ]
    }

    // {
    //   sectionTitle: 'Apps & Pages'
    // },
    // {
    //   title: 'Email',
    //   icon: EmailOutline,
    //   path: '/apps/email'
    // },
    // {
    //   title: 'Chat',
    //   icon: MessageOutline,
    //   path: '/apps/chat'
    // },
    // {
    //   title: 'Calendar',
    //   icon: CalendarBlankOutline,
    //   path: '/apps/calendar'
    // },
    // {
    //   title: 'Invoice',
    //   icon: FileDocumentOutline,
    //   children: [
    //     {
    //       title: 'List',
    //       path: '/apps/invoice/list'
    //     },
    //     {
    //       title: 'Preview',
    //       path: '/apps/invoice/preview'
    //     },
    //     {
    //       title: 'Edit',
    //       path: '/apps/invoice/edit'
    //     },
    //     {
    //       title: 'Add',
    //       path: '/apps/invoice/add'
    //     }
    //   ]
    // },
    // {
    //   title: 'User',
    //   icon: AccountOutline,
    //   children: [
    //     {
    //       title: 'List',
    //       path: '/apps/user/list'
    //     },
    //     {
    //       title: 'View',
    //       path: '/apps/user/view'
    //     }
    //   ]
    // },
    // {
    //   title: 'Roles & Permissions',
    //   icon: LockOutline,
    //   children: [
    //     {
    //       title: 'Roles',
    //       path: '/apps/roles'
    //     },
    //     {
    //       title: 'Permissions',
    //       path: '/apps/permissions'
    //     }
    //   ]
    // },
    // {
    //   title: 'Pages',
    //   icon: FileDocumentOutline,
    //   children: [
    //     {
    //       title: 'Authentication',
    //       children: [
    //         {
    //           title: 'Login',
    //           children: [
    //             {
    //               openInNewTab: true,
    //               title: 'Login v1',
    //               path: '/pages/auth/login-v1'
    //             },
    //             {
    //               openInNewTab: true,
    //               title: 'Login v2',
    //               path: '/pages/auth/login-v2'
    //             },
    //             {
    //               openInNewTab: true,
    //               title: 'Login With AppBar',
    //               path: '/pages/auth/login-with-appbar'
    //             }
    //           ]
    //         },
    //         {
    //           title: 'Register',
    //           children: [
    //             {
    //               openInNewTab: true,
    //               title: 'Register v1',
    //               path: '/pages/auth/register-v1'
    //             },
    //             {
    //               openInNewTab: true,
    //               title: 'Register v2',
    //               path: '/pages/auth/register-v2'
    //             }
    //           ]
    //         },
    //         {
    //           title: 'Forgot Password',
    //           children: [
    //             {
    //               openInNewTab: true,
    //               title: 'Forgot Password v1',
    //               path: '/pages/auth/forgot-password-v1'
    //             },
    //             {
    //               openInNewTab: true,
    //               title: 'Forgot Password v2',
    //               path: '/pages/auth/forgot-password-v2'
    //             }
    //           ]
    //         },
    //         {
    //           title: 'Reset Password',
    //           children: [
    //             {
    //               openInNewTab: true,
    //               title: 'Reset Password v1',
    //               path: '/pages/auth/reset-password-v1'
    //             },
    //             {
    //               openInNewTab: true,
    //               title: 'Reset Password v2',
    //               path: '/pages/auth/reset-password-v2'
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Account Settings',
    //       path: '/pages/account-settings'
    //     },
    //     {
    //       title: 'Pricing',
    //       path: '/pages/pricing'
    //     },
    //     {
    //       title: 'FAQ',
    //       path: '/pages/faq'
    //     },
    //     {
    //       title: 'Knowledge Base',
    //       path: '/pages/knowledge-base'
    //     },
    //     {
    //       title: 'Miscellaneous',
    //       children: [
    //         {
    //           openInNewTab: true,
    //           title: 'Coming Soon',
    //           path: '/pages/misc/coming-soon'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Under Maintenance',
    //           path: '/pages/misc/under-maintenance'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Page Not Found - 404',
    //           path: '/pages/misc/404-not-found'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Not Authorized - 401',
    //           path: '/pages/misc/401-not-authorized'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Server Error - 500',
    //           path: '/pages/misc/500-server-error'
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   icon: VectorArrangeBelow,
    //   title: 'Dialog Examples',
    //   path: '/pages/dialog-examples'
    // },
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/ui/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/ui/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   children: [
    //     {
    //       title: 'Basic',
    //       path: '/ui/cards/basic'
    //     },
    //     {
    //       title: 'Statistics',
    //       path: '/ui/cards/statistics'
    //     },
    //     {
    //       title: 'Advanced',
    //       path: '/ui/cards/advanced'
    //     },
    //     {
    //       title: 'Gamification',
    //       path: '/ui/cards/gamification'
    //     },
    //     {
    //       title: 'Actions',
    //       path: '/ui/cards/actions'
    //     },
    //     {
    //       title: 'Widgets',
    //       path: '/ui/cards/widgets'
    //     }
    //   ]
    // },
    // {
    //   badgeContent: '18',
    //   title: 'Components',
    //   icon: ArchiveOutline,
    //   badgeColor: 'primary',
    //   children: [
    //     {
    //       title: 'Accordion',
    //       path: '/components/accordion'
    //     },
    //     {
    //       title: 'Alerts',
    //       path: '/components/alerts'
    //     },
    //     {
    //       title: 'Avatars',
    //       path: '/components/avatars'
    //     },
    //     {
    //       title: 'Badges',
    //       path: '/components/badges'
    //     },
    //     {
    //       title: 'Buttons',
    //       path: '/components/buttons'
    //     },
    //     {
    //       title: 'Button Group',
    //       path: '/components/button-group'
    //     },
    //     {
    //       title: 'Chips',
    //       path: '/components/chips'
    //     },
    //     {
    //       title: 'Dialogs',
    //       path: '/components/dialogs'
    //     },
    //     {
    //       title: 'List',
    //       path: '/components/list'
    //     },
    //     {
    //       title: 'Menu',
    //       path: '/components/menu'
    //     },
    //     {
    //       title: 'Pagination',
    //       path: '/components/pagination'
    //     },
    //     {
    //       title: 'Ratings',
    //       path: '/components/ratings'
    //     },
    //     {
    //       title: 'Snackbar',
    //       path: '/components/snackbar'
    //     },
    //     {
    //       title: 'Swiper',
    //       path: '/components/swiper'
    //     },
    //     {
    //       title: 'Tabs',
    //       path: '/components/tabs'
    //     },
    //     {
    //       title: 'Timeline',
    //       path: '/components/timeline'
    //     },
    //     {
    //       title: 'Toasts',
    //       path: '/components/toast'
    //     },
    //     {
    //       title: 'Tree View',
    //       path: '/components/tree-view'
    //     },
    //     {
    //       title: 'More',
    //       path: '/components/more'
    //     },
    //   ]
    // },
    // {
    //   sectionTitle: 'Forms & Tables'
    // },
    // {
    //   title: 'Form Elements',
    //   icon: FormSelect,
    //   children: [
    //     {
    //       title: 'Text Field',
    //       path: '/forms/form-elements/text-field'
    //     },
    //     {
    //       title: 'Select',
    //       path: '/forms/form-elements/select'
    //     },
    //     {
    //       title: 'Checkbox',
    //       path: '/forms/form-elements/checkbox'
    //     },
    //     {
    //       title: 'Radio',
    //       path: '/forms/form-elements/radio'
    //     },
    //     {
    //       title: 'Textarea',
    //       path: '/forms/form-elements/textarea'
    //     },
    //     {
    //       title: 'Autocomplete',
    //       path: '/forms/form-elements/autocomplete'
    //     },
    //     {
    //       title: 'Date Pickers',
    //       path: '/forms/form-elements/pickers'
    //     },
    //     {
    //       title: 'Switch',
    //       path: '/forms/form-elements/switch'
    //     },
    //     {
    //       title: 'File Uploader',
    //       path: '/forms/form-elements/file-uploader'
    //     },
    //     {
    //       title: 'Editor',
    //       path: '/forms/form-elements/editor'
    //     },
    //     {
    //       title: 'Slider',
    //       path: '/forms/form-elements/slider'
    //     },
    //     {
    //       title: 'Input Mask',
    //       path: '/forms/form-elements/input-mask'
    //     },
    //   ]
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/forms/form-layouts'
    // }
    // ,
    // {
    //   title: 'Form Validation',
    //   path: '/forms/form-validation',
    //   icon: CheckboxMarkedCircleOutline
    // },
    // {
    //   title: 'Form Wizard',
    //   path: '/forms/form-wizard',
    //   icon: PackageVariantClosed
    // },
    // {
    //   title: 'Table',
    //   icon: Table,
    //   path: '/tables/mui'
    // },
    // {
    //   title: 'Mui DataGrid',
    //   icon: Table,
    //   path: '/tables/data-grid'
    // },
    // {
    //   sectionTitle: 'Charts & Misc'
    // },
    // {
    //   title: 'Charts',
    //   icon: ChartDonut,
    //   children: [
    //     {
    //       title: 'Apex',
    //       path: '/charts/apex-charts'
    //     },
    //     {
    //       title: 'Recharts',
    //       path: '/charts/recharts'
    //     },
    //     {
    //       title: 'ChartJS',
    //       path: '/charts/chartjs'
    //     }
    //   ]
    // },
    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   icon: ShieldOutline,
    //   title: 'Access Control'
    // },
    // {
    //   title: 'Others',
    //   icon: DotsHorizontal,
    //   children: [
    //     {
    //       title: 'Menu Levels',
    //       children: [
    //         {
    //           title: 'Menu Level 2.1'
    //         },
    //         {
    //           title: 'Menu Level 2.2',
    //           children: [
    //             {
    //               title: 'Menu Level 3.1'
    //             },
    //             {
    //               title: 'Menu Level 3.2'
    //             }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Disabled Menu',
    //       disabled: true
    //     },
    //     {
    //       title: 'Raise Support',
    //       externalLink: true,
    //       openInNewTab: true,
    //       path: 'https://themeselection.com/support'
    //     },
    //     {
    //       title: 'Documentation',
    //       externalLink: true,
    //       openInNewTab: true,
    //       path: 'https://demos.themeselection.com/materio-mui-react-nextjs-admin-template/documentation'
    //     }
    //   ]
    // }
  ]
}

export default navigation
