import { useState } from "react";
import { useGetChatUsersQuery } from "../../redux/api/userApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableSortLabel,
  Grid,
  Avatar,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { getComparator, stableSort } from "../../utils/sortingUtil";
import { User } from "../../types/User";
import { StyledPaper, StyledTableContainer } from "./UsersTable.styles";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const UserTable = () => {
  const token = localStorage.getItem("token");

  const {
    data: users,
    isLoading,
    isError,
  } = useGetChatUsersQuery(undefined, { skip: !token });
  const [orderBy, setOrderBy] = useState<
    | "userName"
    | "fullName"
    | "email"
    | "isOnline"
    | "id"
    | "profilePicture"
    | "role"
  >("userName");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const sortedUsers = users
    ? stableSort(users, getComparator(order, orderBy))
    : [];

  const handleRequestSort = (property: keyof User) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !users) {
    return <Typography variant="body1">Error loading users.</Typography>;
  }

  return (
    <StyledPaper elevation={3}>
      <Grid sx={{ padding: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            User List
          </Typography>
        </Grid>
        <Grid item>
          <StyledTableContainer>
            <Paper elevation={3}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "id"}
                        direction={orderBy === "id" ? order : "asc"}
                        onClick={() => handleRequestSort("id")}
                      >
                        ID
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Profile Picture</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "userName"}
                        direction={orderBy === "userName" ? order : "asc"}
                        onClick={() => handleRequestSort("userName")}
                      >
                        Username
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "fullName"}
                        direction={orderBy === "fullName" ? order : "asc"}
                        onClick={() => handleRequestSort("fullName")}
                      >
                        Full Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "email"}
                        direction={orderBy === "email" ? order : "asc"}
                        onClick={() => handleRequestSort("email")}
                      >
                        Email
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "isOnline"}
                        direction={orderBy === "isOnline" ? order : "asc"}
                        onClick={() => handleRequestSort("isOnline")}
                      >
                        Online Status
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedUsers.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>
                        {user.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt={user.fullName}
                            id={user.id}
                          />
                        ) : (
                          <Avatar>
                            <Person />
                          </Avatar>
                        )}
                      </TableCell>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.isOnline ? "Online" : "Offline"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </StyledTableContainer>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default UserTable;
