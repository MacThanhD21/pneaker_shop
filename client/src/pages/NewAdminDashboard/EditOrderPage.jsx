

import { AppContainer, Sidebar, SidebarHeader, SidebarNav, NavButton, NavIconWrapperl,
    Header, HeaderContainer, MenuButton, MobileTitle, HeaderActions, NotificationButton,
    NotificationBadge, UserProfileContainer, UserAvatar, UserName, ChevronIcon, MobileMenu,
    MainContent, MainContentArea, WelcomeContainer, WelcomeTitle, WelcomeText, SectionHeader,
    SectionTitle, ActionButton, TableContainer, Table, TableHead, TableBody, TableRow,
    TableCell, TableHeaderCell, StatusBadge, ActionLink, NavIconWrapper
 } from "./Components";

export default function OrderDetailPage(){
    return (
        <div>
              <SectionHeader>
                <SectionTitle>Order History</SectionTitle>
                <ActionButton>Export Data</ActionButton>
              </SectionHeader>
              <TableContainer>
                <Table>
                  <TableHead>
                    <tr>
                      <TableHeaderCell>Order ID</TableHeaderCell>
                      <TableHeaderCell>Customer</TableHeaderCell>
                      <TableHeaderCell>Date</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Total</TableHeaderCell>
                      <TableHeaderCell>Actions</TableHeaderCell>
                    </tr>
                  </TableHead>
                  <TableBody>
                    {[1, 2, 3].map((item) => (
                      <tr key={item}>
                        <TableCell>#ORD-{item}0{item}5</TableCell>
                        <TableCell highlight>Customer {item}</TableCell>
                        <TableCell>2025-04-{item < 10 ? '0' + item : item}</TableCell>
                        <TableCell>
                          <StatusBadge status={
                            item === 1 ? 'Completed' : 
                            item === 2 ? 'Pending' : 
                            'Processing'
                          }>
                            {item === 1 ? 'Completed' : item === 2 ? 'Pending' : 'Processing'}
                          </StatusBadge>
                        </TableCell>
                        <TableCell>${item * 49}.99</TableCell>
                        <TableCell>
                          <ActionLink>View</ActionLink>
                          <ActionLink color="#4b5563" hoverColor="#111827">Print</ActionLink>
                        </TableCell>
                      </tr>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
    )
}