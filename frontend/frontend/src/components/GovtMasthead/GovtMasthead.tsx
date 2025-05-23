import React from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import {
  Box,
  chakra,
  Collapse,
  Flex,
  Icon,
  Stack,
  Text,
  useDisclosure,
  VisuallyHidden,
} from '@chakra-ui/react'

import { BxsBank } from '~assets/icons/BxsBank'
import { BxsLockAlt } from '~assets/icons/BxsLockAlt'
import { useIsMobile } from '~hooks/useIsMobile'
import Link from '~components/Link'

import { GovtMastheadIcon } from './GovtMastheadIcon'
import { GovtMastheadItem } from './GovtMastheadItem'

export interface GovtMastheadProps {
  defaultIsOpen?: boolean
}

interface GovtMastheadChildrenProps {
  isOpen: boolean
  isMobile: boolean
  onToggle: () => void
  children: React.ReactNode
}

interface HeaderBarProps extends GovtMastheadChildrenProps {
  /**
   * ID of the expandable section for accessibility.
   */
  ariaControlId: string
}

const HeaderBar = ({
  isMobile,
  children,
  onToggle,
  isOpen,
  ariaControlId,
}: HeaderBarProps): JSX.Element => {
  const styleProps = {
    bg: 'neutral.200',
    py: { base: '0.5rem', md: '0.375rem' },
    px: { base: '1.5rem', md: '1.75rem', lg: '2rem' },
    textStyle: { base: 'legal', md: 'caption-2' },
    display: 'flex',
    width: '100%',
  }

  // Mobile
  if (isMobile) {
    return (
      <chakra.button
        aria-controls={ariaControlId}
        aria-describedby="masthead-aria"
        aria-expanded={isOpen}
        _focus={{
          boxShadow: '0 0 0 2px inset var(--chakra-colors-primary-500)',
        }}
        {...styleProps}
        onClick={onToggle}
      >
        <VisuallyHidden id="masthead-aria">
          {isOpen
            ? 'Collapse masthead'
            : 'Expand masthead to find out how to identify an official government website'}
        </VisuallyHidden>
        {children}
      </chakra.button>
    )
  }

  // Non-mobile
  return <Flex {...styleProps}>{children}</Flex>
}

const HowToIdentify = ({
  isOpen,
  isMobile,
  children,
  onToggle,
}: GovtMastheadChildrenProps): JSX.Element => {
  // Mobile
  if (isMobile) {
    return (
      <Text
        aria-hidden
        as="span"
        color="primary.500"
        textDecorationLine="underline"
        display="flex"
        alignItems="center"
      >
        How to identify {children}
      </Text>
    )
  }

  // Non-mobile
  return (
    <Link
      as="button"
      tabIndex={0}
      aria-label={
        isOpen
          ? 'Collapse masthead'
          : 'Expand masthead to find out how to identify an official government website'
      }
      onClick={onToggle}
    >
      How to identify {children}
    </Link>
  )
}

export const GovtMasthead = ({
  defaultIsOpen,
}: GovtMastheadProps): JSX.Element => {
  const { onToggle, isOpen } = useDisclosure({ defaultIsOpen })
  const isMobile = useIsMobile()

  const ariaControlId = 'govt-masthead-expandable'

  return (
    <Box>
      <HeaderBar
        onToggle={onToggle}
        isMobile={isMobile}
        isOpen={isOpen}
        ariaControlId={ariaControlId}
      >
        <svg width="3em" height="1.5em" viewBox="0 0 2371 2328" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_25_388)">
            <path d="M1227.01 1283.68C1226.7 1089.59 1226.23 895.494 1226.75 701.413C1226.78 693.407 1234.41 682.185 1241.79 677.924C1367.85 605.183 1494.34 533.121 1620.96 461.31C1666.05 435.735 1711.77 411.203 1760.13 384.585C1760.13 419.548 1760.13 450.451 1760.13 481.368C1760.13 642.534 1759.68 803.7 1760.76 964.854C1760.89 982.913 1753.61 992.176 1739.94 999.867C1616.13 1069.52 1492.34 1139.19 1368.43 1208.65C1323.17 1234.01 1277.6 1258.83 1232.17 1283.91C1230.45 1283.77 1228.73 1283.69 1227.01 1283.68Z" fill="#FFA216" />
            <path d="M39.7129 1358.48C114.452 1316.1 185.635 1275.83 256.755 1235.42C345.029 1185.26 433.253 1135.03 521.465 1084.8C535.277 1076.93 548.485 1067.9 562.887 1061.31C568.38 1058.8 577.767 1059.39 583.121 1062.42C679.879 1117.27 776.096 1173.05 872.829 1227.94C938.858 1265.41 1005.54 1301.76 1071.84 1338.78C1081.71 1344.29 1091.1 1350.65 1104.11 1358.73C1065.29 1380.97 1028.99 1401.87 992.585 1422.58C903.594 1473.21 814.553 1523.75 725.537 1574.34C677.956 1601.39 630.551 1628.73 582.606 1655.15C577.277 1658.09 567.424 1658.47 562.259 1655.58C492.195 1616.29 422.634 1576.13 352.859 1536.36C273.846 1491.33 194.734 1446.48 115.659 1401.56C91.8934 1388.05 68.1156 1374.58 39.7129 1358.48Z" fill="#FFA216" />
            <path d="M653.588 315.815C699.547 289.335 739.852 265.91 780.369 242.823C870.805 191.271 961.304 139.807 1051.87 88.4683C1089.47 67.1412 1127.66 46.7943 1164.85 24.8011C1179.78 15.9787 1191.42 16.6825 1206.35 25.3164C1305.61 82.7375 1405.33 139.392 1505.06 195.996C1568.77 232.153 1632.79 267.795 1696.62 303.738C1701.77 306.641 1706.59 310.097 1716.35 316.368C1685.69 333.95 1658.65 349.521 1631.53 364.967C1491.96 444.444 1352.17 523.557 1212.98 603.688C1192.69 615.375 1176.1 614.156 1156.78 603.059C1043.57 537.972 930.011 473.463 816.576 408.752C763.969 378.728 711.323 348.73 653.588 315.815Z" fill="#FFA216" />
            <path d="M1754.78 1683.87C1699.06 1716.14 1643.5 1748.7 1587.56 1780.64C1489.5 1836.6 1391.33 1892.39 1292.91 1947.75C1273.36 1958.75 1252.49 1967.51 1228.26 1979.22C1227.38 1967.74 1226.19 1959.4 1226.19 1951.04C1226.09 1768.49 1226.38 1585.92 1225.67 1403.36C1225.61 1385.84 1231.54 1377.46 1246.91 1368.93C1344.89 1314.52 1441.75 1258.19 1539.61 1203.6C1608.12 1165.38 1677.62 1128.9 1746.79 1091.84C1748.81 1090.76 1752.09 1091.92 1754.79 1092.05C1756.28 1093.51 1757.75 1094.95 1759.23 1096.41C1759.23 1290.78 1759.23 1485.15 1759.23 1679.52C1757.75 1680.98 1756.26 1682.42 1754.78 1683.87Z" fill="#FFA216" />
            <path d="M1139.7 1285.16C1110.98 1269.87 1081.41 1254.96 1052.68 1238.64C977.465 1195.9 902.826 1152.16 827.572 1109.51C762.283 1072.51 696.203 1036.85 631.204 999.377C623.663 995.029 616.474 982.863 616.437 974.292C615.607 779.219 615.796 584.145 615.796 386.772C687.934 427.227 758.563 466.664 829.017 506.402C908.984 551.495 988.813 596.826 1068.69 642.069C1090.97 654.687 1113.6 666.802 1135.25 680.413C1140.06 683.441 1143.98 691.799 1143.98 697.693C1144.06 891.887 1143.62 1086.08 1143.18 1280.27C1143.18 1280.93 1142.29 1281.58 1139.7 1285.16Z" fill="#FFA216" />
            <path d="M1842.78 1631.29C1842.48 1437.07 1842.03 1242.84 1842.44 1048.62C1842.45 1041.09 1848.86 1030.48 1855.51 1026.54C1919.27 988.669 1983.56 951.683 2047.98 914.936C2151.49 855.881 2255.21 797.178 2358.92 738.462C2361.79 736.841 2365.53 736.69 2370.44 735.446C2370.44 827.93 2370.44 919.485 2370.44 1011.03C2370.44 1110.83 2369.81 1210.62 2370.99 1310.4C2371.22 1329.7 2365.6 1341.29 2348.76 1350.59C2283.81 1386.47 2219.23 1422.99 2154.76 1459.69C2055.06 1516.43 1955.56 1573.53 1855.89 1630.33C1853.73 1631.56 1850.6 1631.15 1847.92 1631.51C1846.21 1631.37 1844.5 1631.3 1842.78 1631.29Z" fill="#FFA216" />
            <path d="M522.822 2326.99C474.5 2300.19 427.485 2274.46 380.796 2248.14C303.971 2204.83 227.346 2161.17 150.672 2117.59C103.858 2090.97 56.8047 2064.72 10.7446 2036.89C4.52365 2033.13 0.476896 2021.13 0.451761 2012.94C-0.113779 1819.72 0.0118987 1626.51 0.0118987 1428.35C32.4739 1446.09 62.7868 1462.2 92.6599 1479.08C182.505 1529.83 272.313 1580.68 361.882 1631.9C413.208 1661.26 464.257 1691.12 514.892 1721.61C521.151 1725.38 528 1734.4 528.012 1741.03C528.641 1932.47 528.427 2123.9 528.214 2315.34C528.214 2317.63 526.178 2319.93 522.822 2326.99Z" fill="#FFA216" />
            <path d="M1144.36 1430.76C1144.36 1626.69 1144.48 1821.67 1143.89 2016.66C1143.86 2023.71 1138.66 2033.88 1132.7 2037.31C1037.05 2092.28 940.794 2146.25 844.866 2200.76C778.874 2238.25 713.208 2276.29 647.229 2313.79C638.306 2318.86 628.427 2322.29 615.797 2327.89C615.797 2316.09 615.797 2307.48 615.797 2298.87C615.797 2117.16 616.25 1935.45 615.206 1753.73C615.081 1731.45 623.828 1721.33 642.403 1711.14C730.639 1662.76 818.009 1612.84 905.63 1563.37C982.455 1519.99 1059.19 1476.47 1136.02 1433.1C1138.12 1431.9 1140.82 1431.71 1144.36 1430.76Z" fill="#FFA216" />
            <path d="M1842.78 930.821C1842.78 752.525 1842.78 574.242 1842.78 395.946C1846.31 395.871 1849.85 395.795 1853.38 395.72C1902.98 422.388 1952.96 448.378 2002.07 475.888C2087.44 523.695 2172.3 572.407 2257.33 620.817C2280.78 634.176 2304.06 647.85 2330.62 663.233C2282.48 691.12 2237.89 717.286 2192.97 742.886C2103.38 793.948 2013.72 844.922 1923.83 895.456C1898.78 909.532 1872.78 921.986 1847.21 935.169C1845.73 933.724 1844.26 932.266 1842.78 930.821Z" fill="#FFA216" />
            <path d="M1842.78 930.821C1844.26 932.279 1845.73 933.724 1847.21 935.182C1845.73 933.724 1844.26 932.266 1842.78 930.821Z" fill="#FFA216" />
            <path d="M1227.01 1283.68C1228.73 1283.69 1230.45 1283.77 1232.16 1283.91C1230.78 1285.13 1229.39 1286.36 1228.02 1287.58C1227.68 1286.28 1227.35 1284.97 1227.01 1283.68Z" fill="#FFA216" />
            <path d="M1842.78 1631.29C1844.5 1631.3 1846.22 1631.37 1847.93 1631.51C1846.55 1632.73 1845.17 1633.96 1843.8 1635.18C1843.46 1633.89 1843.12 1632.58 1842.78 1631.29Z" fill="#FFA216" />
            <path d="M1754.78 1683.87C1756.26 1682.42 1757.75 1680.97 1759.23 1679.52C1757.75 1680.98 1756.26 1682.42 1754.78 1683.87Z" fill="#FFA216" />
          </g>
          <defs>
            <clipPath id="clip0_25_388">
              <rect width="2370.79" height="2327.89" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <Flex alignItems="center" flexWrap="wrap">
          <Text my="2px">A BuildingBloCS Website&ensp;</Text>
          <HowToIdentify
            isOpen={isOpen}
            onToggle={onToggle}
            isMobile={isMobile}
          >
            <Icon
              aria-hidden
              as={isOpen ? BiChevronUp : BiChevronDown}
              fontSize={{ base: '1rem', md: '1.25rem' }}
            />
          </HowToIdentify>
        </Flex>
      </HeaderBar>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '1rem', md: '4.5rem', lg: '9.5rem' }}
          bg="neutral.200"
          px="2rem"
          py={{ base: '1.5rem', md: '2.25rem', lg: '2.75rem' }}
          textStyle={{ base: 'caption-2', lg: 'body-1' }}
          id={ariaControlId}
          aria-hidden={!isOpen}
        >
          <GovtMastheadItem
            icon={BxsBank}
            header="Official website links end with .buildingblocs.sg"
          >
            <Box textStyle={{ base: 'caption-2', md: 'body-1' }}>
              <Text as="span">
                BuildingBloCS communicate via <b>.buildingblocs.sg</b> websites
                (e.g. buildingblocs.sg).{' '}
              </Text>
            </Box>
          </GovtMastheadItem>
          <GovtMastheadItem
            icon={BxsLockAlt}
            header="Secure websites use HTTPS"
          >
            <Box textStyle={{ base: 'caption-2', md: 'body-1' }}>
              <Text as="span">Look for a lock (</Text>
              <Icon
                aria-hidden
                as={BxsLockAlt}
                height={{ base: '1rem', md: '1.5rem' }}
                verticalAlign="bottom"
              />
              <Text as="span">
                ) or https:// as an added precaution.
                <br></br>Share sensitive information only on official, secure
                websites.
              </Text>
            </Box>
          </GovtMastheadItem>
        </Stack>
      </Collapse>
    </Box>
  )
}
