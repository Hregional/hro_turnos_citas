import {
  getAccessTokenService,
  getAreas,
  verifyAccessTokenService,
} from "../services/authentication";

export const getAccessTokenController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const accessToken = await getAccessTokenService(username, password);
    res.json(accessToken);
  } catch (error) {
    res.status(500).json({
      message:
        "An error occurred while generating access token from the authentication service",
    });
  }
};

export const getAreasController = async (_req, res) => {
  try {
    const response = await getAreas();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message:
        "An error occurred while fetching the areas from the api gateway service",
    });
  }
};

export const verifyAccessTokenController = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Missing authentication token" });
  }
  try {
    const response = await verifyAccessTokenService(token);
    if (response.status === 200) {
      next();
      return;
    }
    return res
      .status(response.status)
      .json({ message: "Authentication failed: Invalid token." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Authentication service error." });
  }
};

// Higher-order middleware to validate JWT for protected routes
export const protectedRoute = (routeHandler) => {
  return (req, res, next) => {
    verifyAccessTokenController(req, res, (error) => {
      if (error) {
        return res
          .status(401)
          .json({ message: "Authentication failed: Invalid token." });
      }
      routeHandler(req, res, next);
    });
  };
};
