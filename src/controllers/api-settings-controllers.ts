export default class ApiSettingsController {
  apiStatus = (req, res) => {
    return res.status(200).json({
      "Backend Pattern":"A&M Solutions Backend Pattern",
      "ORM":"TypeORM",
      "api version": "1.0.2",
    });
  };
}
