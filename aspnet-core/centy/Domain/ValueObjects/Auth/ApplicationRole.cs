using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace centy.Domain.ValueObjects.Auth;

[CollectionName("Roles")]
public class ApplicationRole : MongoIdentityRole<Guid>
{
}
