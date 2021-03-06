-- phpMyAdmin SQL Dump
-- version 2.11.3deb1ubuntu1.1
-- http://www.phpmyadmin.net
--
-- Host: 192.168.31.203
-- Generation Time: May 20, 2009 at 04:53 PM
-- Server version: 4.1.13
-- PHP Version: 5.2.4-2ubuntu5.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `test`
--

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `parent_id`, `title`, `iconCls`, `handler`, `ajax`) VALUES
(42, 0, 'Exports', 'rss', '', ''),
(35, 50, 'New Inward Delivery', 'app', '', ''),
(32, 0, 'Costing Sheet', 'rss', '', ''),
(34, 0, 'Inventories', 'rss', '', ''),
(22, 0, 'Purchase', 'rss', '', ''),
(23, 22, 'Purchase Order', 'rss', '', ''),
(24, 0, 'Merchandiser', 'rss', '', ''),
(433, 42, 'Negotiation & Payment', 'app', '', ''),
(44, 42, 'Invoice', 'app', '', ''),
(45, 42, 'Reports', 'rss', '', ''),
(46, 22, 'Process Order', 'rss', '', ''),
(47, 24, 'Specifications', 'rss', '', ''),
(49, 24, 'Orders', 'app', '', ''),
(50, 34, 'GRIN', 'rss', '', ''),
(51, 0, 'Requisition', 'rss', '', ''),
(53, 23, 'General', 'rss', '', ''),
(52, 51, 'General', 'app', '', ''),
(65, 50, 'New Inward Return', 'app', '', ''),
(67, 50, 'New Outward Return', 'app', '', ''),
(66, 50, 'New Outward Delivery', 'app', '', ''),
(68, 480, 'Non Fabric QC', 'rss', '', ''),
(69, 34, 'MTN', 'rss', '', ''),
(70, 68, 'New QC', 'app', '', ''),
(71, 69, 'New MTO', 'app', '', ''),
(72, 34, 'Stocks', 'rss', '', ''),
(73, 455, 'New OS', 'app', '', ''),
(79, 47, 'New Specifications', 'app', '', ''),
(80, 46, 'Internal Process Order', 'rss', '', ''),
(81, 46, 'Vendor Process Order', 'rss', '', ''),
(82, 51, 'Regular', 'rss', '', ''),
(83, 23, 'Regular', 'rss', '', ''),
(84, 23, 'Combined', 'rss', '', ''),
(88, 480, 'Fabric QC', 'rss', '', ''),
(89, 439, 'New Fabric Roll Register', 'app', '', ''),
(90, 440, 'New Fabric Inspection', 'app', '', ''),
(91, 82, 'Create Regular', 'app', '', ''),
(92, 24, 'Work Order', 'rss', '', ''),
(93, 92, 'New Work Order', 'app', '', ''),
(94, 53, 'Create General PO', 'app', '', ''),
(95, 83, 'Create Regular PO', 'app', '', ''),
(96, 0, 'PPIC', 'rss', '', ''),
(97, 485, 'Material Tracking', 'app', '', ''),
(98, 96, 'Trucking Schedule', 'app', '', ''),
(100, 484, 'PR againts PO', 'app', '', ''),
(101, 24, 'Export Delivery Info', 'rss', '', ''),
(102, 101, 'New Export Delivery Info', 'app', '', ''),
(43, 42, 'Doc Master', 'app', '', ''),
(432, 42, 'Proforma', 'app', '', ''),
(460, 441, 'New OCN', 'app', '', ''),
(435, 483, 'PR Tracking', 'app', '', ''),
(436, 484, 'PO Tracking', 'app', '', ''),
(437, 22, 'Report', 'app', '', ''),
(438, 484, 'Supplier Summary', 'app', '', ''),
(439, 88, 'Fabric Roll Register', 'rss', '', ''),
(440, 88, 'Fabric Inspection', 'rss', '', ''),
(441, 96, 'Order Closing', 'rss', '', ''),
(442, 51, 'Report', 'app', '', ''),
(443, 24, 'Measurement Chart', 'rss', '', ''),
(444, 443, 'New Measurement Chart', 'app', '', ''),
(445, 24, 'Packing Chart', 'rss', '', ''),
(446, 445, 'New Packing Chart', 'app', '', ''),
(455, 72, 'OSN', 'rss', '', ''),
(448, 0, 'Liabilities', 'rss', '', ''),
(449, 448, 'De-Associate', 'rss', '', ''),
(450, 449, 'New LD', 'app', '', ''),
(451, 448, 'Settlement', 'rss', '', ''),
(452, 451, 'New LS', 'app', '', ''),
(453, 448, 'Associate', 'rss', '', ''),
(454, 453, 'New LA', 'app', '', ''),
(456, 72, 'ASN', 'rss', '', ''),
(457, 72, 'RSN', 'rss', '', ''),
(458, 456, 'New ASN', 'app', '', ''),
(459, 457, 'New RSN', 'app', '', ''),
(478, 482, 'Spec.Item againts PR', 'app', '', ''),
(486, 34, 'Inquiry', 'rss', '', ''),
(461, 69, 'New MTR', 'app', '', ''),
(463, 51, 'Process Regular', 'rss', '', ''),
(462, 84, 'Create Combine PO', 'app', '', ''),
(464, 463, 'New Process Regular', 'app', '', ''),
(481, 487, 'Inward Delivery Report', 'app', '', ''),
(468, 0, 'Accounting', 'rss', '', ''),
(465, 51, 'Process General', 'rss', '', ''),
(466, 465, 'New Process General', 'app', '', ''),
(469, 468, 'Exchange Rate', 'rss', '', ''),
(470, 469, 'New Exchange Rate', 'app', '', ''),
(489, 441, 'OCR', 'rss', '', ''),
(471, 463, 'Approve Proc Reg', 'app', '', ''),
(472, 465, 'Approve Proc Gen', 'app', '', ''),
(473, 80, 'New IPO', 'app', '', ''),
(474, 80, 'Approve IPO', 'app', '', ''),
(475, 81, 'New VPO', 'app', '', ''),
(476, 81, 'Approve VPO', 'app', '', ''),
(477, 50, 'New Outward General', 'app', '', ''),
(480, 34, 'QC', 'rss', '', ''),
(482, 24, 'Inquiry', 'rss', '', ''),
(483, 51, 'Inquiry', 'rss', '', ''),
(484, 22, 'Inquiry', 'rss', '', ''),
(485, 96, 'Inquiry', 'rss', '', ''),
(487, 34, 'Reports', 'rss', '', ''),
(488, 42, 'Inquiry', 'app', '', ''),
(490, 441, 'OCS', 'rss', '', ''),
(492, 489, 'New OCR', 'app', '', ''),
(493, 490, 'New OCS', 'app', '', ''),
(494, 486, 'Stock Journal', 'app', '', ''),
(495, 22, 'Rejected Notes', 'rss', '', ''),
(496, 495, 'New Rejected Notes', 'app', '', ''),
(497, 0, 'Administration', 'rss', '', ''),
(498, 497, 'Items', 'rss', '', ''),
(499, 498, 'New Item Request', 'app', '', ''),
(500, 498, 'New Item Approval', 'app', '', ''),
(501, 497, 'Companies', 'rss', '', ''),
(502, 501, 'New Agent', 'app', '', ''),
(503, 501, 'New Buyer', 'app', '', ''),
(504, 501, 'New Bank', 'app', '', ''),
(505, 501, 'New Supplier', 'app', '', ''),
(506, 0, 'Cutting', 'rss', '', ''),
(507, 506, 'Cutting Request', 'rss', '', ''),
(508, 507, 'New FCR', 'app', '', ''),
(509, 486, 'WO Item Balance', 'app', '', ''),
(510, 486, 'Item Stock View', 'app', '', ''),
(511, 487, 'Import Items Report', 'app', '', ''),
(512, 487, 'Daily Stock Report', 'app', '', ''),
(513, 53, 'FPO & Fabric Chart', 'app', '', ''),
(514, 83, 'FPO & Fabric Chart', 'app', '', ''),
(515, 84, 'FPO & Fabric Chart', 'app', '', ''),
(516, 42, 'Open Invoice', 'app', '', ''),
(518, 486, 'Expected Arrival PO', 'app', '', ''),
(517, 484, 'Purchase Monitoring', 'app', '', ''),
(519, 487, 'Rejected Item Report', 'app', '', ''),
(520, 498, 'Item Request History', 'app', '', ''),
(522, 484, 'Item Status Report', 'app', '', ''),
(523, 53, 'Hongkong PO', 'app', '', ''),
(524, 83, 'Hongkong PO', 'app', '', ''),
(525, 84, 'Hongkong PO', 'app', '', ''),
(565, 575, 'Line Production', 'app', '', ''),
(526, 96, 'Production Schedule', 'app', '', ''),
(534, 506, 'Cutting Planning', 'app', '', ''),
(527, 0, 'Part Section', 'rss', '', ''),
(528, 575, 'Line Operation Operator', 'app', '', ''),
(529, 527, 'Daily Output', 'app', '', ''),
(533, 45, 'Invoice Monthly Report', 'app', '', ''),
(535, 506, 'Cutting Order', 'app', '', ''),
(538, 22, 'Invoice', 'rss', '', ''),
(539, 538, 'Create New Invoice', 'app', '', ''),
(540, 45, 'Doc Master Report', 'app', '', ''),
(541, 562, 'Orders On Hand', 'app', '', ''),
(563, 561, 'Transfer Invoice', 'app', '', ''),
(544, 0, 'Technical', 'rss', '', ''),
(545, 544, 'Garment Inf sheet', 'app', '', ''),
(629, 0, 'Industrial Enginering', 'rss', '', ''),
(548, 629, 'Reports', 'rss', '', ''),
(1524, 569, 'Employee Transfer', 'app', '', ''),
(1523, 1528, 'Packing List', 'app', '', ''),
(559, 22, 'Adjustment', 'app', '', ''),
(560, 562, 'GSS', 'app', '', ''),
(561, 468, 'ACCPAC', 'rss', '', ''),
(562, 32, 'Inquiry', 'rss', '', ''),
(564, 561, 'Transfer GRIN Inward', 'app', '', ''),
(566, 575, 'Work Periode', 'app', '', ''),
(567, 575, 'Machine', 'app', '', ''),
(568, 0, 'General', 'rss', '', ''),
(569, 568, 'HR Menu', 'rss', '', ''),
(570, 569, 'Employee', 'app', 'browse-emp.js', 'ajax.emp.php'),
(573, 561, 'Transfer GRIN Outward', 'app', '', ''),
(574, 484, 'Fabrics Report', 'app', '', ''),
(575, 96, 'Master', 'rss', '', ''),
(578, 575, 'Machine Repair Type', 'app', '', ''),
(577, 487, 'Fabric Roll Balance', 'app', '', ''),
(579, 575, 'Machine Fault Type', 'app', '', ''),
(580, 575, 'Machine Parts Type', 'app', '', ''),
(581, 575, 'Machine Service Type', 'app', '', ''),
(582, 0, 'CPI', 'rss', '', ''),
(583, 582, 'Daily Output', 'app', '', ''),
(586, 544, 'Product Section', 'app', '', ''),
(587, 544, 'Product Type', 'app', '', ''),
(588, 544, 'Master Operation', 'app', '', ''),
(589, 544, 'Sewing Engineering Sheet', 'app', '', ''),
(590, 544, 'Machine Moving', 'app', '', ''),
(591, 0, 'Quality Assurance', 'rss', '', ''),
(592, 591, 'Cutting', 'rss', '', ''),
(593, 591, 'CPI', 'app', '', ''),
(594, 591, 'Part Section', 'app', '', ''),
(595, 591, 'Sewing', 'app', '', ''),
(596, 598, 'Key Hole', 'app', '', ''),
(597, 591, 'Washing', 'app', '', ''),
(598, 591, 'Finishing', 'rss', '', ''),
(599, 598, 'Button/Rivet', 'app', '', ''),
(600, 598, 'Garment Inspection Report (Inlin', 'app', '', ''),
(601, 598, 'Ironing/Wrinkle', 'app', '', ''),
(602, 598, 'Garment Inspection Report (Inter', 'app', '', ''),
(603, 598, 'Garment Inspection Report (Final', 'app', '', ''),
(605, 592, 'Pattern Inspection', 'app', '', ''),
(606, 592, 'Marker Checklist', 'app', '', ''),
(607, 592, 'Cutting Checklist', 'app', '', ''),
(608, 592, 'Shading Inspection', 'app', '', ''),
(609, 591, 'Accessories Check', 'app', '', ''),
(661, 646, 'Report Allocation', 'app', '', ''),
(620, 562, 'Buyer Contribution', 'app', '', ''),
(622, 0, 'Washing', 'rss', '', ''),
(621, 0, 'Sewing', 'rss', '', ''),
(623, 0, 'Finishing', 'rss', '', ''),
(624, 621, 'Daily Output', 'app', '', ''),
(625, 622, 'Daily Output', 'app', '', ''),
(626, 623, 'Daily Output', 'app', '', ''),
(627, 548, 'Material Utilization', 'rss', '', ''),
(628, 627, 'Daily Spread Loss Cutting', 'app', '', ''),
(630, 1562, 'Master Parameters', 'app', '', ''),
(631, 487, 'Outward General Report', 'app', '', ''),
(632, 629, 'Monitoring Board', 'app', '', ''),
(633, 582, 'Material Transfer', 'app', '', ''),
(634, 621, 'Material Transfer', 'app', '', ''),
(635, 622, 'Material Transfer', 'app', '', ''),
(636, 623, 'Material Transfer', 'app', '', ''),
(637, 487, 'Daily Incoming Stock', 'app', '', ''),
(638, 487, 'Daily Outgoing Stock', 'app', '', ''),
(639, 487, 'Monthly Incoming Stock', 'app', '', ''),
(640, 487, 'Monthly Outgoing Stock', 'app', '', ''),
(641, 575, 'Product Name', 'app', '', ''),
(642, 575, 'FR Time table', 'app', '', ''),
(643, 487, 'Monthly Stock Report', 'app', '', ''),
(644, 1527, 'Master Defect', 'app', '', ''),
(646, 34, 'Stock Allocation', 'rss', '', ''),
(647, 646, 'New Stock Allocation', 'app', '', ''),
(649, 34, 'Inventory Adjusment', 'rss', '', ''),
(650, 649, 'New Adjustment', 'app', '', ''),
(651, 485, 'Budget Capacity', 'app', '', ''),
(652, 497, 'Holidays', 'rss', '', ''),
(653, 652, 'New Holidays', 'app', '', ''),
(660, 486, 'Outstanding Report', 'app', '', ''),
(662, 32, 'Price Deduction Approval', 'rss', '', ''),
(663, 662, 'Approved Price Deduction', 'app', '', ''),
(664, 662, 'Rejected Price Deduction', 'app', '', ''),
(1527, 591, 'Master', 'rss', '', ''),
(1528, 0, 'Packing', 'rss', '', ''),
(1529, 544, 'Product Operations', 'app', '', ''),
(1530, 544, 'Product Name Operations', 'app', '', ''),
(1531, 575, 'Line Parameters', 'app', '', ''),
(1544, 544, 'Product Panel', 'app', '', ''),
(1532, 544, 'Product Parts', 'app', '', ''),
(1533, 569, 'Department Section', 'app', '', ''),
(1534, 575, 'PPIC Parameters', 'app', '', ''),
(1535, 544, 'Product Stitch', 'app', '', ''),
(1536, 569, 'Department Group', 'app', '', ''),
(1545, 569, 'Absence', 'app', 'emp.js', ''),
(1546, 1527, 'Measurement Chart', 'app', '', ''),
(1547, 569, 'Permisssion', 'rss', '', ''),
(1548, 569, 'Master Permission Type', 'app', '', ''),
(1550, 569, 'Master Approval Level', 'app', '', ''),
(1551, 569, 'User Page Access', 'app', '', ''),
(1552, 569, 'Permission Verificator', 'app', '', ''),
(1553, 575, 'Standart Working Hour', 'app', '', ''),
(1554, 32, 'New Test', 'app', '', ''),
(1555, 32, 'Tampil Mahendra', 'app', '', ''),
(1556, 32, 'hendra new', 'app', '', ''),
(1558, 1557, 'coba satu', '', '', ''),
(1562, 629, 'Master', 'rss', '', ''),
(1563, 1562, 'Master Downtime', 'app', '', ''),
(1564, 22, 'Purchase Monitoring', 'app', '', ''),
(1565, 569, 'Set Supervisor', 'app', '', ''),
(1568, 1547, 'Department Report', 'app', '', ''),
(1569, 1547, 'Employee Reports', 'app', '', '');

