import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Image,
  Link,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Button,
  Popover,
  PopoverTrigger,
  Icon,
  Badge,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  PopoverFooter,
  ButtonGroup,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import pesanan from "../assets/pesanan.svg";
import keranjang from "../assets/keranjang.svg";
import user from "../assets/user.svg";
import { useSelector, useDispatch } from "react-redux";
import { logout, deleteCart } from "../redux/userSlice";
import { IoCartOutline } from "react-icons/io5";
import Axios from "axios";
import { cartSync } from "../redux/cartSlice";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      w={"100px"}
      h={"50px"}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      // _hover={{
      //   bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      // }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Navbar() {
  const { name, cart } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.cartSlice.value);

  const onlogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    sessionStorage.removeItem("id");
  };

  // const onDeleteCart = async (id, email) => {
  //   try {
  //     await Axios.delete(`http://localhost:8000/cart/${id}`);

  //     Swal.fire({
  //       icon: "success",
  //       title: "Good Job",
  //       text: "Cart Berhasil Dihapus",
  //       timer: 2000,
  //       customClass: {
  //         container: "my-swal",
  //       },
  //     });
  //     const result = await Axios.get(`http://localhost:8000/cart`);
  //     dispatch(cartSync(result.data));
  //     dispatch(deleteCart());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <Box
        bg={useColorModeValue("#ebf5e9")}
        position={"fixed"}
        justifyContent={"center"}
        bottom={0}
      >
        <Container
          as={Stack}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
          position={"relative"}
        >
          <Stack direction={"row"} spacing={6}>
            <>
              <SocialButton label={"Produk"} href={"#"}>
                <Box textAlign={"center"}>
                  <FontAwesomeIcon icon={faHouse} />
                  <Text>Produk</Text>
                </Box>
              </SocialButton>
              <SocialButton label={"Transaksi"} href={"#"}>
                <Box textAlign={"center"}>
                  <Image src={pesanan} margin="auto" />
                  <Text>Transaksi</Text>
                </Box>
              </SocialButton>
              {/* <SocialButton label={"Cart"} href={"#"}>
                <Box textAlign={"center"}>
                  <Image src={keranjang} margin="auto" />
                  <Text>Keranjang</Text>
                </Box>
              </SocialButton> */}

              <Popover isLazy>
                <PopoverTrigger>
                  <Button bg={useColorModeValue("white", "gray.800")}>
                    <Icon boxSize="6" as={IoCartOutline} mr="5px" x />
                    {name && cart !== 0 ? (
                      <Badge p="1" ml="-2" mt="-3" borderRadius="full">
                        <Text fontSize="xx-small">{cart}</Text>
                      </Badge>
                    ) : null}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader fontWeight="semibold">My Cart</PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <TableContainer bg="grey.100">
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Img</Th>
                            <Th>Title</Th>
                            <Th>Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {data?.map((item, index) => {
                            return (
                              <Tr key={index}>
                                <Td>
                                  <Stack>
                                    <Image
                                      boxSize="35px"
                                      objectFit="cover"
                                      src={item.Product.image}
                                    />
                                  </Stack>
                                </Td>
                                <Td>
                                  <Box display="flex" fontSize="xs">
                                    <Text fontWeight="bold" mr="5px">
                                      {" "}
                                      {item.Product.name}{" "}
                                    </Text>
                                  </Box>
                                  <Box display="flex" fontSize="xs">
                                    <Text
                                      fontWeight="bold"
                                      color="#213360"
                                      textColor="#FF6B6B"
                                      mr="5px"
                                    >
                                      {" "}
                                      {item.Product.price}{" "}
                                    </Text>
                                  </Box>
                                </Td>
                                <Td>
                                  {/* <Button onClick={() => onDeleteCart(item.id)}>
                                    <Icon boxSize="4" as={DeleteIcon} />
                                  </Button> */}
                                </Td>
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </PopoverBody>
                  <PopoverFooter display="flex" justifyContent="flex-end">
                    <ButtonGroup size="sm">
                      <Button as={Link} to="/cart" colorScheme="pink">
                        Selengkapnya
                      </Button>
                    </ButtonGroup>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>

              <SocialButton label={"Akun"}>
                <Box textAlign={"center"}>
                  {name ? (
                    <Menu>
                      <MenuButton as={Button}>
                        <Image src={user} margin="auto" />
                        <Text>{name}</Text>
                      </MenuButton>
                      <MenuList>
                        <MenuItem>
                          <Link href="/profile">Profile</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link onClick={onlogout}>Logout</Link>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  ) : (
                    <>
                      <SocialButton label={"akun"} href={"/login"}>
                        <Image src={user} margin="auto" />
                        <Text>Akun</Text>
                      </SocialButton>
                    </>
                  )}
                </Box>
              </SocialButton>
            </>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
