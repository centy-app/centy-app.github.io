using MongoDB.Driver;

namespace centy.Infrastructure.Database.Repositories;

public class BaseRepository
{
    private static readonly string ConnectionString =
        Environment.GetEnvironmentVariable("MONGODB") ?? throw new Exception("Database connection string is missing.");

    protected readonly IMongoDatabase Database;

    protected BaseRepository()
    {
        var client = new MongoClient(ConnectionString);
        Database = client.GetDatabase("centy");
    }
}
