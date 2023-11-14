using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace centy.Domain.Entities.Auth;

[CollectionName("Roles")]
public class ApplicationRole : MongoIdentityRole<Guid>
{
}
